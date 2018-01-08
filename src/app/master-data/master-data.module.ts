import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import * as fromServices from "./services";

import { reducer, effects } from "./store";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature("masterData", reducer),
    EffectsModule.forFeature([...effects])
  ],
  declarations: [],
  providers: [...fromServices.services]
})
export class MasterDataModule {}
