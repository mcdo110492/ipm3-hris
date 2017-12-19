import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import * as fromComponents from "./components";
import * as fromCore from "./../../core";

const routes: Routes = [
  {
    path: "",
    component: fromComponents.ProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
