import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/index";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { ContractTypeRoutingModule } from "./contract-type-routing.module";
import * as fromComponents from "./components";
import * as fromServices from "./services";

import { reducer, effects } from "./store";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContractTypeRoutingModule,
    StoreModule.forFeature("contractType", reducer),
    EffectsModule.forFeature([...effects])
  ],
  declarations: [...fromComponents.components],
  entryComponents: [fromComponents.ContractTypeFormComponent],
  providers: [...fromServices.services]
})
export class ContractTypeModule {}
