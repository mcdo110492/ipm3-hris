import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EmployeeStatusComponent } from "./components";

const routes: Routes = [
  {
    path: "",
    component: EmployeeStatusComponent,
    data: { title: "Employee / Status / List" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeStatusRoutingModule {}
