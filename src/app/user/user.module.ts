import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StoreModule } from "@ngrx/store";

import { reducer } from "./store";

@NgModule({
  imports: [CommonModule, StoreModule.forFeature("user", reducer)],
  declarations: []
})
export class UserModule {}
