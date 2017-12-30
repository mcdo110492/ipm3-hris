import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EmploymentStatusComponent } from "./components";

const routes: Routes = [
  {
    path: "",
    component: EmploymentStatusComponent,
    data: { title: "Employment / Status / List" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmploymentStatusRoutingModule {}
