import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-loader",
  template: `
    <mat-spinner mode="indeterminate" [diameter]="45" [strokeWidth]="5" color="primary"></mat-spinner>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {}
