import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";

import { LoaderComponent } from "./loader.component";

@Injectable()
export class LoaderService {
  dialogRef;
  constructor(private dialog: MatDialog) {}

  openLoader() {
    return (this.dialogRef = this.dialog.open(LoaderComponent, {
      id: "loader-spinner",
      disableClose: true,
      height: "auto",
      width: "auto"
    }));
  }

  closeLoader() {
    this.dialogRef.close();
  }
}
