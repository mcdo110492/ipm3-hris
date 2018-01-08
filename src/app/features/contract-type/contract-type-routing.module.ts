import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ContractTypeComponent } from "./components";

const routes: Routes = [{ path: "", component: ContractTypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractTypeRoutingModule {}
