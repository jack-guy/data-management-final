import { Component, OnInit, Input } from '@angular/core';
import { TypesService } from '../types.service';
import { share, flatMap, map, tap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-eva-preview',
  templateUrl: './eva-preview.component.html',
  styleUrls: ['./eva-preview.component.scss'],
})
export class EvaPreviewComponent implements OnInit {
  private type$;
  private object$;

  @Input() rdfType;
  @Input() listField;
  @Input() listFieldVal;

  constructor(
    private apollo: Apollo,
    private types: TypesService
  ) { }

  ngOnInit() {
    this.type$ = this.types.get(this.rdfType).pipe(share());
    this.object$ = this.type$.pipe(
      flatMap((type: any) => this.apollo.query({
        query: gql`
          query withPrefixes @prefix(carnot: "http://Carnot.org/") {
            ${type.rdfType} {
              ${type.columns.map((col) => {
                if (col.input === 'eva') {
                  return `${col.rdfField} @optional {
                    ${col.listField} @optional
                  }\n`;
                }
                return `${col.rdfField} @optional\n`
              })}
            }
          }
        `,
        variables: { '@reasoning': true },
        fetchPolicy: 'no-cache'
      })),
      map(({data}) => data.filter(
        (x) => x[this.listField] === this.listFieldVal
      )[0]),
      share(),
    );
  }
}
