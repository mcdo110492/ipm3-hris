import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/index";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SalaryTypeRoutingModule } from "./salary-type-routing.module";
import * as fromComponents from "./components";
import * as fromServices from "./services";
import { reducer, effects } from "./store";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature("salaryType", reducer),
    EffectsModule.forFeature([...effects]),
    SalaryTypeRoutingModule
  ],
  declarations: [...fromComponents.components],
  entryComponents: [fromComponents.SalaryTypeFormComponent],
  providers: [...fromServices.services]
})
export class SalaryTypeModule {}
