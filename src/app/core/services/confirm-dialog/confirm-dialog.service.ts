import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";

import { ConfirmDialogComponent } from "./confirm-dialog.component";

@Injectable()
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}

  openConfirm(title: string, message: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: "auto",
      data: { title, message }
    });
  }
}
