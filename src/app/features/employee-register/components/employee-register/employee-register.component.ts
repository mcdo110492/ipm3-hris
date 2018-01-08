import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as fromEmployeeRegister from "./../../store/reducers/employee-register.reducer";
import * as EmployeeRegisterActions from "./../../store/actions/employee-register.action";
import * as fromMasterData from "@master-data/store/reducers/master-data.reducer";
import * as MasterDataActions from "@master-data/store/actions/master-data.action";
import * as MasterDataSelectors from "@master-data/store/selectors/master-data.selector";

import { ConfirmDialogService } from "@core/services";
import { Position } from "@app/features/position/models";
import { EmployeeStatus } from "@app/features/employee-status/models";
import { EmploymentStatus } from "@app/features/employment-status/models";
import { ContractType } from "@app/features/contract-type/models";

@Component({
  selector: "app-employee-register",
  template: `<app-employee-register-form [positions]="positions$ | async" [employeeStatus]="employeeStatus$ | async" [employmentStatus]="employmentStatus$ | async" [contractTypes]="contractTypes$ | async" (submit)="submit()" ></app-employee-register-form>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeRegisterComponent implements OnInit {
  positions$: Observable<Position[]>;
  employeeStatus$: Observable<EmployeeStatus[]>;
  employmentStatus$: Observable<EmploymentStatus[]>;
  contractTypes$: Observable<ContractType[]>;
  constructor(
    private store$: Store<fromEmployeeRegister.State>,
    private master$: Store<fromMasterData.State>,
    private confirm: ConfirmDialogService
  ) {}

  ngOnInit() {
    this.positions$ = this.master$.select(MasterDataSelectors.getPositions);
    this.employeeStatus$ = this.master$.select(
      MasterDataSelectors.getEmployeeStatus
    );
    this.employmentStatus$ = this.master$.select(
      MasterDataSelectors.getEmploymentStatus
    );
    this.contractTypes$ = this.master$.select(
      MasterDataSelectors.getContractTypes
    );

    this.master$.dispatch(new MasterDataActions.LoadAllPositions());
    this.master$.dispatch(new MasterDataActions.LoadAllEmploymentStatus());
    this.master$.dispatch(new MasterDataActions.LoadAllEmployeeStatus());
    this.master$.dispatch(new MasterDataActions.LoadAllContractType());
  }

  submit() {
    const confirm = this.confirm.openConfirm(
      "Would you like to proceed?",
      "Click Yes to register this employee."
    );

    confirm.afterClosed().subscribe(response => {
      if (response) {
        this.store$.dispatch(new EmployeeRegisterActions.Submit());
      }
    });
  }
}
