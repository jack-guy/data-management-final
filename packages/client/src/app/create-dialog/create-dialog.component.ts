import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TypesService } from '../types.service';
import { share, map, take } from 'rxjs/operators';
import gql from 'graphql-tag';
import { GraphService } from '../graph.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Router, Route, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
  private type = this.data.type;
  private form: FormGroup;
  private loading = false;
  private errorMessage: string = null;

  private evaQueries: { [k: string]: Observable<any> };

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    private types: TypesService,
    private graph: GraphService,
    private apollo: Apollo,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(refresh: boolean = false): void {
    this.dialogRef.close({
      refresh
    });
  }

  ngOnInit() {
    this.form = this.types.typeToFormGroup(this.type);
    this.form.addControl('iriPath', new FormControl(''));
    this.evaQueries = this.type.inputs
      .filter((type) => type.inputType === 'eva')
      .reduce((prev, type) => {
        return {
          ...prev,
          [type.rdfField]: this.getEvaOptions(type.schema, type.listField)
        }
      }, {});
  }

  private getFormValue (input) {
    const raw = this.form.get(input.rdfField).value;
    if (input.inputType === 'date') {
      return moment(raw).format('YYYY-MM-DD');
    } else if (input.inputType === 'bool') {
      return (raw) ? raw : false;
    }
    return raw;
  }

  create(e: Event) {
    e.preventDefault();
    this.loading = true;
    this.errorMessage = null;

    this.graph.create(
      this.type.rdfType,
      this.form.get('iriPath').value,
      this.type.inputs.map(input => ({
        schema: input.schema,
        field: input.rdfField,
        value: this.getFormValue(input)
      }))
    ).toPromise().then(
      () => this.types.find(true).toPromise()
    ).then(() => {      
      this.onCancel(true);
    }).catch((res) => {
      if (res.error && res.error.message) {
        this.errorMessage = res.error.message;
      } else {
        this.errorMessage = 'An unknown error occured.';
      }
    }).then(() => {
      this.loading = false;
    });
  }

  getEvaOptions(schema, listField) {
    // return of([{ [listField]: 'foo' }])
    return this.apollo.query({
      query: gql`
        query withPrefixes @prefix(carnot: "http://Carnot.org/") {
          ${schema} {
            ${listField}
          }
        }
      `,
      variables: { '@reasoning': true },
      fetchPolicy: 'no-cache'
    }).pipe(
      map(({data}) => data as Array<any>),
      take(1)
    );
  }
}
