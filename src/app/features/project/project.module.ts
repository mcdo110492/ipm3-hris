import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/index";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { ProjectRoutingModule } from "./project-routing.module";

import * as fromComponents from "./components";
import * as fromServices from "./services";

import { reducer, effects } from "./store";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectRoutingModule,
    StoreModule.forFeature("project", reducer),
    EffectsModule.forFeature([...effects])
  ],
  declarations: [...fromComponents.components],
  entryComponents: [fromComponents.ProjectFormComponent],
  providers: [...fromServices.services]
})
export class ProjectModule {}
