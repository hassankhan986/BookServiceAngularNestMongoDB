import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
})
export class AddBookDialogComponent {
  constructor( public dialogRef: MatDialogRef<AddBookDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: { message: string }) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
