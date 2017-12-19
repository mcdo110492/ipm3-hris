import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatMenuModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatStepperModule,
  MatTableModule,
  MatIconModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTooltipModule,
  MatTabsModule,
  MatSortModule,
  MatPaginatorModule,
  MatChipsModule
} from "@angular/material";

import { FlexLayoutModule } from "@angular/flex-layout";

const MATERIAL_MODULES: any[] = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatMenuModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatStepperModule,
  MatTableModule,
  MatIconModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTooltipModule,
  MatTabsModule,
  MatSortModule,
  MatPaginatorModule,
  MatChipsModule
];

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [MATERIAL_MODULES, FlexLayoutModule]
})
export class SharedModule {}
