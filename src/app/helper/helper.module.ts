import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import * as fromHelpers from "./services";

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [...fromHelpers.helpers]
})
export class HelperModule {}
