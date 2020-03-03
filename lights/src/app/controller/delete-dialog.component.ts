import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {Component, OnInit, ChangeDetectorRef, Input, Output} from '@angular/core';
import { ControllerComponent } from './controller.component';

@Component({
    selector: 'delete-dialog',
    templateUrl: 'delete-dialog.html',
  })
  export class DeleteDialog {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteDialog>) {}
  
      onNoClick(): void {
        this.dialogRef.close(false);
      }
  
      onYesClick(): void {
        this.dialogRef.close(true);
      }
  
  }