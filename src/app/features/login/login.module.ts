import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "./../../shared";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { reducer, effects } from "./store";

import * as fromComponents from "./components";
import * as fromServices from "./services";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature("login", reducer),
    EffectsModule.forFeature([...effects])
  ],
  declarations: [...fromComponents.components],
  providers: [...fromServices.services]
})
export class LoginModule {}
