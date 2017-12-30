import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "@shared/index";

import { PositionRoutingModule } from "./position-routing.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";
import { reducer, effects } from "./store";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PositionRoutingModule,
    StoreModule.forFeature("position", reducer),
    EffectsModule.forFeature([...effects])
  ],
  declarations: [...fromComponents.components],
  entryComponents: [fromComponents.PositionFormComponent],
  providers: [...fromServices.services]
})
export class PositionModule {}
