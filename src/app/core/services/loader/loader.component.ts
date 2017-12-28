import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-loader",
  template: `
    <mat-progress-spinner mode="indeterminate" [diameter]="45" [strokeWidth]="5" color="primary"></mat-progress-spinner>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {}
