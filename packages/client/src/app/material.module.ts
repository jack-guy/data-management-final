import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatDividerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInput,
  MatInputModule,
  MatDialogModule,
  MatCardModule,
  MatChipsModule
} from '@angular/material';

import {
  SatPopoverModule
} from '@ncstate/sat-popover'; 

const MATERIAL_COMPONENTS = [
  MatButtonModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatDividerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatDialogModule,
  MatCardModule,
  MatChipsModule
];

@NgModule({
  imports: [ ...MATERIAL_COMPONENTS ],
  exports: [ ...MATERIAL_COMPONENTS ],
  declarations: []
})
export class MaterialModule { }
