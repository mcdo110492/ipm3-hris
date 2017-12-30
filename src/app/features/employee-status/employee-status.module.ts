import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/index";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { EmployeeStatusRoutingModule } from "./employee-status-routing.module";
import * as fromComponents from "./components";
import * as fromServices from "./services";
import { reducer, effects } from "./store";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EmployeeStatusRoutingModule,
    StoreModule.forFeature("employeeStatus", reducer),
    EffectsModule.forFeature([...effects])
  ],
  declarations: [...fromComponents.components],
  entryComponents: [fromComponents.EmployeeStatusFormComponent],
  providers: [...fromServices.services]
})
export class EmployeeStatusModule {}
