import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";

import {
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

import * as fromComponents from "./components";

@NgModule({
  imports: [CommonModule],
  declarations: [...fromComponents.components],
  exports: [
    MATERIAL_MODULES,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    fromComponents.components
  ]
})
export class SharedModule {}
