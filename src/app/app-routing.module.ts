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
    canLoad: [fromCore.ProtectedRoutesGuard],
    canActivate: [fromCore.ProtectedRoutesGuard],
    data: { title: "Projects" }
  },
  {
    path: "positions",
    loadChildren: "app/features/position/position.module#PositionModule",
    canLoad: [fromCore.ProtectedRoutesGuard],
    canActivate: [fromCore.ProtectedRoutesGuard],
    data: { title: "Positions" }
  },
  {
    path: "employment/status",
    loadChildren:
      "app/features/employment-status/employment-status.module#EmploymentStatusModule",
    canLoad: [fromCore.ProtectedRoutesGuard],
    canActivate: [fromCore.ProtectedRoutesGuard],
    data: { title: "Employment / Status" }
  },
  {
    path: "employee/status",
    loadChildren:
      "app/features/employee-status/employee-status.module#EmployeeStatusModule",
    canLoad: [fromCore.ProtectedRoutesGuard],
    canActivate: [fromCore.ProtectedRoutesGuard],
    data: { title: "Employee / Status" }
  },
  {
    path: "contract/types",
    loadChildren:
      "app/features/contract-type/contract-type.module#ContractTypeModule",
    canLoad: [fromCore.ProtectedRoutesGuard],
    canActivate: [fromCore.ProtectedRoutesGuard],
    data: { title: "Contract / Types" }
  },
  {
    path: "salary/types",
    loadChildren:
      "app/features/salary-type/salary-type.module#SalaryTypeModule",
    canLoad: [fromCore.ProtectedRoutesGuard],
    canActivate: [fromCore.ProtectedRoutesGuard],
    data: { title: "Salary / Types" }
  },
  {
    path: "employee/register",
    loadChildren:
      "app/features/employee-register/employee-register.module#EmployeeRegisterModule",
    canLoad: [fromCore.ProtectedRoutesGuard],
    canActivate: [fromCore.ProtectedRoutesGuard],
    data: { title: "Employee / Register" }
  },
  {
    path: "employee/list",
    loadChildren:
      "app/features/employee-list/employee-list.module#EmployeeListModule",
    canLoad: [fromCore.ProtectedRoutesGuard],
    canActivate: [fromCore.ProtectedRoutesGuard],
    data: { title: "Employee / List" }
  },
  {
    path: "employee/details/:employeeId",
    loadChildren:
      "app/features/employee-details/employee-details.module#EmployeeDetailsModule",
    canLoad: [fromCore.ProtectedRoutesGuard],
    canActivate: [fromCore.ProtectedRoutesGuard],
    data: { title: "Employee / Details" }
  },
  {
    path: "profile/settings",
    loadChildren:
      "app/features/profile-settings/profile-settings.module#ProfileSettingsModule",
    canLoad: [fromCore.ProtectedRoutesGuard],
    canActivate: [fromCore.ProtectedRoutesGuard],
    data: { title: "Profile Settings" }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: "always" })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
