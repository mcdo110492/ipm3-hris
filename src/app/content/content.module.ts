import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { SharedModule } from "./../shared";

import { StoreModule } from "@ngrx/store";

import { reducer } from "./store";
import * as fromComponents from "./components";
import * as fromServices from "./services";
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature("content", reducer)
  ],
  declarations: [...fromComponents.components, ToolbarComponent],
  exports: [fromComponents.ContentComponent],
  providers: [...fromServices.services]
})
export class ContentModule {}
