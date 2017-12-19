import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProjectRoutingModule } from "./project-routing.module";
import * as fromComponents from "./components";

@NgModule({
  imports: [CommonModule, ProjectRoutingModule],
  declarations: [fromComponents.components]
})
export class ProjectModule {}
