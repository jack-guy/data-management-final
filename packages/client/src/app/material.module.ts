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
  MatChipsModule,
  MatDatepickerModule,
  MatSelectModule,
  MatProgressBarModule,
  MAT_DATE_FORMATS
} from '@angular/material';
import { MomentDateModule } from '@angular/material-moment-adapter';

import {
  SatPopoverModule
} from '@ncstate/sat-popover'; 

export const DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
  MatChipsModule,
  MatSelectModule,
  MatDatepickerModule,
  MomentDateModule,
  MatProgressBarModule,
];

@NgModule({
  imports: [ ...MATERIAL_COMPONENTS ],
  exports: [ ...MATERIAL_COMPONENTS ],
  declarations: [],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ]
})
export class MaterialModule { }
