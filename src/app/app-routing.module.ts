import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import * as fromCore from "./core";

import * as fromLoginComponent from "@features/login/components";

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
    canActivate: [fromCore.ProtectedRoutesGuard],
    canLoad: [fromCore.ProtectedRoutesGuard],
    data: { title: "Projects" }
  },
  {
    path: "positions",
    loadChildren: "app/features/position/position.module#PositionModule",
    canActivate: [fromCore.ProtectedRoutesGuard],
    canLoad: [fromCore.ProtectedRoutesGuard],
    data: { title: "Positions" }
  },
  {
    path: "employment/status",
    loadChildren:
      "app/features/employment-status/employment-status.module#EmploymentStatusModule",
    canActivate: [fromCore.ProtectedRoutesGuard],
    canLoad: [fromCore.ProtectedRoutesGuard],
    data: { title: "Employment / Status" }
  },
  {
    path: "employee/status",
    loadChildren:
      "app/features/employee-status/employee-status.module#EmployeeStatusModule",
    canActivate: [fromCore.ProtectedRoutesGuard],
    canLoad: [fromCore.ProtectedRoutesGuard],
    data: { title: "Employee / Status" }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
