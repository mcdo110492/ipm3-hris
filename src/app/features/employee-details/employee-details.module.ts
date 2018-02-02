import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/index";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { EmployeeDetailsRoutingModule } from "./employee-details-routing.module";
import * as fromComponents from "./components";
import * as fromServices from "./services";
import { reducer, effects } from "./store";
import { EmployeeContractListComponent } from './components/employee-contract/employee-contract-list/employee-contract-list.component';
import { EmployeeContractFormComponent } from './components/employee-contract/employee-contract-form/employee-contract-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EmployeeDetailsRoutingModule,
    StoreModule.forFeature("employeeDetails", reducer),
    EffectsModule.forFeature([...effects])
  ],
  declarations: [...fromComponents.components, EmployeeContractListComponent, EmployeeContractFormComponent],
  entryComponents: [...fromComponents.entryComponents],
  providers: [...fromServices.services]
})
export class EmployeeDetailsModule {}
