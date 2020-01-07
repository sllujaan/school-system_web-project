import { NgModule } from '@angular/core';
import {MatProgressSpinnerModule, MatNativeDateModule, MatDatepickerModule, MatRadioModule, MatSelectModule, MatDialogModule, MatIconModule, MatInputModule, MatButtonModule, MatToolbarModule, MatTableModule, MatSortModule, MatFormFieldModule } from '@angular/material'
import { MatFileUploadModule } from 'mat-file-upload'

const MaterialComponents = [
  MatButtonModule,
  MatToolbarModule,
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFileUploadModule,
  MatProgressSpinnerModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
