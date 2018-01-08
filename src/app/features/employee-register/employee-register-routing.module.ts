import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EmployeeRegisterComponent } from "./components";

const routes: Routes = [
  {
    path: "",
    component: EmployeeRegisterComponent,
    data: { title: "Employee / Register / Form" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRegisterRoutingModule {}
