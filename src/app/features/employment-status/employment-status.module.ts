import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/index";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { EmploymentStatusRoutingModule } from "./employment-status-routing.module";
import * as fromComponents from "./components";
import * as fromServices from "./services";
import { reducer, effects } from "./store";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EmploymentStatusRoutingModule,
    StoreModule.forFeature("employmentStatus", reducer),
    EffectsModule.forFeature([...effects])
  ],
  declarations: [...fromComponents.components],
  entryComponents: [fromComponents.EmploymentStatusFormComponent],
  providers: [...fromServices.services]
})
export class EmploymentStatusModule {}
