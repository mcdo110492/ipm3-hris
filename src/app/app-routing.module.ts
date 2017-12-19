import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import * as fromCore from "./core";

import * as fromLoginComponent from "./features/login/components";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  {
    path: "login",
    component: fromLoginComponent.LoginComponent,
    canActivate: [fromCore.LoginGuard]
  },
  {
    path: "projects",
    loadChildren: "app/features/project/project.module#ProjectModule",
    canActivate: [fromCore.ProtectedRoutesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
