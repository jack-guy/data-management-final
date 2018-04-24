import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TypesService } from '../types.service';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
  private type = this.data.type;

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    private types: TypesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);
  }
}
