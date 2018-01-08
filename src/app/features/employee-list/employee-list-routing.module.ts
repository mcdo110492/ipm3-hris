import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EmployeeListComponent } from "./components/employee-list/employee-list.component";

const routes: Routes = [
  {
    path: "",
    component: EmployeeListComponent,
    data: { title: "Employee / List" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeListRoutingModule {}
