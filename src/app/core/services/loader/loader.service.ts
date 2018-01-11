import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";

import { LoaderComponent } from "./loader.component";

@Injectable()
export class LoaderService {
  dialogRef;
  constructor(private dialog: MatDialog) {}

  openLoader() {
    setTimeout(() => {
      this.dialogRef = this.dialog.open(LoaderComponent, {
        disableClose: true,
        height: "auto",
        width: "auto"
      });
    }, 0);
  }

  closeLoader() {
    setTimeout(() => {
      this.dialogRef.close();
    }, 0);
  }
}
