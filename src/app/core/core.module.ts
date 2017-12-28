import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";

import * as fromServices from "./services";

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule, MatDialogModule],
  declarations: [fromServices.LoaderComponent],
  entryComponents: [fromServices.LoaderComponent],
  providers: [
    ...fromServices.services,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: fromServices.RequestTokenInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        "Core Module is already loaded. Import this module only in your root module"
      );
    }
  }
}
