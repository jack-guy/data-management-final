import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TypesService } from '../types.service';
import { share } from 'rxjs/operators';
import gql from 'graphql-tag';
import { GraphService } from '../graph.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
  private type = this.data.type;
  private iriPath: string;

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    private types: TypesService,
    private graph: GraphService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);
  }

  create() {
    this.graph.create(
      this.type.rdfType,
      this.iriPath,
      [

      ]
    )
    // const query = gql`
    //   mutation create @prefix(carnot: "http://Carnot.org/") {
    //     ${type.rdfType}
    //       ${type.columns.map((col) => {
    //         if (col.inputType === 'eva' || col.inputType === 'meva') {
    //           return `${col.rdfField} @optional {
    //             ${col.listField} @optional
    //           }\n`;
    //         }
    //         return `${col.rdfField} @optional\n`
    //       })}

    //     createReview(episode: $ep, review: $review) {
    //       stars
    //       commentary
    //     }
    //   }
    // `;
  }
}
