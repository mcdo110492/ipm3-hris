import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/index";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { EmployeeListRoutingModule } from "./employee-list-routing.module";
import * as fromComponents from "./components";
import * as fromServices from "./services";
import { reducer, effects } from "./store";

@NgModule({
  imports: [
    CommonModule,
    EmployeeListRoutingModule,
    SharedModule,
    StoreModule.forFeature("employeeList", reducer),
    EffectsModule.forFeature([...effects])
  ],
  declarations: [...fromComponents.components],
  providers: [...fromServices.services]
})
export class EmployeeListModule {}
