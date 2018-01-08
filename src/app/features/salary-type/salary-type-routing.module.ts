import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SalaryTypeComponent } from "./components";

const routes: Routes = [{ path: "", component: SalaryTypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryTypeRoutingModule {}
