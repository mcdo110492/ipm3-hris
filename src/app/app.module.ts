import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";

import { ServiceWorkerModule } from "@angular/service-worker";
import { AppComponent } from "./app.component";

import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ToastModule } from "ng2-toastr/ng2-toastr";

import { environment } from "../environments/environment";

import { StoreModule, MetaReducer } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { storeFreeze } from "ngrx-store-freeze";

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

import { CoreModule } from "./core";
import { HelperModule } from "./helper";
import { ContentModule } from "./content";
import { UserModule } from "./user";
import { LoginModule } from "./features/login";
import { MasterDataModule } from "./master-data";

import { reducers, effects, CustomSerializer } from "./store";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production
    }),
    MatProgressBarModule,
    ToastModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 10 })
      : [],
    CoreModule,
    HelperModule,
    UserModule,
    LoginModule,
    ContentModule,
    MasterDataModule
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule {}
