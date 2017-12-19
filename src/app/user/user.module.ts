import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { reducer, effects } from "./store";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature("user", reducer),
    EffectsModule.forFeature(effects)
  ],
  declarations: []
})
export class UserModule {}
