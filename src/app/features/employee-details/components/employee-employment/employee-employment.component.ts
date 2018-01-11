import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";

import * as MasterDataActions from "@master-data/store/actions";
import * as fromMasterData from "@master-data/store/reducers/master-data.reducer";
import * as MasterDataSelectors from "@master-data/store/selectors";

import * as EmploymentActions from "./../../store/actions/employee-employment.action";
import * as fromEmployment from "./../../store/reducers/employee-employment.reducer";
import * as EmploymentSelectors from "./../../store/selectors/employee-employment.selector";

import { EmployeeEmployment } from "@app/features/employee-details/models/employee-employment.model";
import { Position } from "@app/features/position/models/position.model";
import { EmploymentStatus } from "@app/features/employment-status/models";
import { EmployeeStatus } from "@app/features/employee-status/models";
import { ContractType } from "@app/features/contract-type/models";

@Component({
  selector: "app-employee-employment",
  templateUrl: "./employee-employment.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeEmploymentComponent implements OnInit {
  employmentForm: FormGroup;
  employmentData$: Observable<EmployeeEmployment>;
  isLoading$: Observable<boolean>;
  positions$: Observable<Position[]>;
  employmentStatus$: Observable<EmploymentStatus[]>;
  employeeStatus$: Observable<EmployeeStatus[]>;
  contractTypes$: Observable<ContractType[]>;
  constructor(
    private fb: FormBuilder,
    private masterStore$: Store<fromMasterData.State>,
    private store$: Store<fromEmployment.State>
  ) {}

  ngOnInit() {
    this.store$.dispatch(new EmploymentActions.LoadEmploymentInfo());
    this.masterStore$.dispatch(new MasterDataActions.LoadAllPositions());
    this.masterStore$.dispatch(new MasterDataActions.LoadAllEmploymentStatus());
    this.masterStore$.dispatch(new MasterDataActions.LoadAllEmployeeStatus());
    this.masterStore$.dispatch(new MasterDataActions.LoadAllContractType());
    this.createForm();
    this.employmentData$ = this.store$.select(
      EmploymentSelectors.getEmploymentData
    );
    this.isLoading$ = this.store$.select(
      EmploymentSelectors.getEmploymentIsLoading
    );
    this.positions$ = this.masterStore$.select(
      MasterDataSelectors.getPositions
    );
    this.employmentStatus$ = this.masterStore$.select(
      MasterDataSelectors.getEmploymentStatus
    );
    this.employeeStatus$ = this.masterStore$.select(
      MasterDataSelectors.getEmployeeStatus
    );
    this.contractTypes$ = this.masterStore$.select(
      MasterDataSelectors.getContractTypes
    );

    this.employmentData$.pipe(take(2)).subscribe((data: EmployeeEmployment) => {
      if (data !== null) {
        const {
          employeeEmploymentId,
          employeeId,
          positionId,
          employmentStatusId,
          employeeStatusId,
          contractTypeId,
          remarks,
          dateHired,
          contractStart,
          contractEnd
        } = data;
        this.employmentForm.setValue({
          employeeEmploymentId,
          employeeId,
          positionId,
          employmentStatusId,
          employeeStatusId,
          contractTypeId,
          remarks,
          dateHired: new Date(dateHired),
          contractStart: new Date(contractStart),
          contractEnd: new Date(contractEnd)
        });
      }
    });
  }

  createForm() {
    this.employmentForm = this.fb.group({
      employeeEmploymentId: [null, Validators.required],
      employeeId: [null, Validators.required],
      positionId: [null, Validators.required],
      employmentStatusId: [null, Validators.required],
      employeeStatusId: [null, Validators.required],
      dateHired: [null, Validators.required],
      contractStart: [null, Validators.required],
      contractEnd: [null, Validators.required],
      contractTypeId: [null, Validators.required],
      remarks: [null, [Validators.required, Validators.maxLength(150)]]
    });
  }

  save() {
    this.store$.dispatch(
      new EmploymentActions.SaveEmploymentInfo(this.employmentForm.value)
    );
  }
}
