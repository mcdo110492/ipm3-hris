import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PositionComponent } from "./components";

const routes: Routes = [
  {
    path: "",
    component: PositionComponent,
    data: { title: "Positions / List" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionRoutingModule {}
