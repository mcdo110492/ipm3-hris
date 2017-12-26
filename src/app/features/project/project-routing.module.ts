import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import * as fromComponents from "./components";
import * as fromCore from "@core/index";

const routes: Routes = [
  {
    path: "",
    component: fromComponents.ProjectComponent,
    canActivate: [fromCore.ProtectedRoutesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
