import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatExpansionModule,
  MatGridListModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule,
} from '@angular/material';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatExpansionModule,
  MatGridListModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  exports: MATERIAL_MODULES
})
export class CustomMaterialModule { }
