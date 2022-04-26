import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './alert.component.html',

})
export class AlertComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AlertComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public dismiss() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}