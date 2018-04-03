import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "@shared/index";

import { ProfileSettingsRoutingModule } from "./profile-settings-routing.module";
import { ProfileSettingsComponent } from "./profile-settings.component";

import * as fromServices from "./services";
import { reducer, effects } from "./store";

import * as fromComponents from "./components";

import { FileUploadModule } from "ng2-file-upload";

@NgModule({
  imports: [
    CommonModule,
    ProfileSettingsRoutingModule,
    SharedModule,
    StoreModule.forFeature("profileSettings", reducer),
    EffectsModule.forFeature([...effects]),
    FileUploadModule
  ],
  declarations: [ProfileSettingsComponent, ...fromComponents.components],
  providers: [...fromServices.services]
})
export class ProfileSettingsModule {}
