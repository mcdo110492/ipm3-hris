import { Component, Inject, ChangeDetectionStrategy } from "@angular/core";

import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { ConfirmDialog } from "./confirm-dialog.model";

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialog) {}
}
