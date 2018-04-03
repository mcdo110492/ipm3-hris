import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@app/shared";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { UserManagementRoutingModule } from "./user-management-routing.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";

import { reducer, effects } from "./store";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserManagementRoutingModule,
    StoreModule.forFeature("userManagement", reducer),
    EffectsModule.forFeature([...effects])
  ],
  declarations: [...fromComponents.components],
  entryComponents: [...fromComponents.entryComponents],
  providers: [...fromServices.services]
})
export class UserManagementModule {}
