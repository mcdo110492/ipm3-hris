import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material/dialog";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";

import * as MasterDataActions from "@master-data/store/actions/master-data.action";
import * as fromMasterData from "@master-data/store/reducers/master-data.reducer";
import * as MasterDataSelectors from "@master-data/store/selectors/master-data.selector";

import * as CompensationActions from "./../../../store/actions/employee-compensation.action";
import * as fromCompensation from "./../../../store/reducers/employee-compensation.reducer";
import * as CompnesationSelectors from "./../../../store/selectors/employee-compensation.selector";

import { EmployeeCompensation } from "./../../../models/employee-compensation.model";
import { SalaryType } from "@app/features/salary-type/models";

@Component({
  selector: "app-employee-compensation-form",
  templateUrl: "./employee-compensation-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeCompensationFormComponent implements OnInit {
  compensationForm: FormGroup;
  compensationData$: Observable<EmployeeCompensation>;
  salaryTypes$: Observable<SalaryType[]>;
  isSavingLoading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromCompensation.State>,
    private masterStore$: Store<fromMasterData.State>,
    private dialogRef: MatDialogRef<EmployeeCompensationFormComponent>
  ) {}

  ngOnInit() {
    this.createForm();

    this.compensationData$ = this.store$.select(
      CompnesationSelectors.getCompensationSelectedEntityData
    );
    this.isSavingLoading$ = this.store$.select(
      CompnesationSelectors.getCompensationIsSavingLoading
    );
    this.salaryTypes$ = this.masterStore$.select(
      MasterDataSelectors.getSalaryTypes
    );

    this.compensationData$
      .pipe(take(1))
      .subscribe((data: EmployeeCompensation) => {
        if (data != null) {
          this.compensationForm.patchValue(data);
        }
      });

    this.masterStore$.dispatch(new MasterDataActions.LoadAllSalaryType());
  }

  createForm() {
    this.compensationForm = this.fb.group({
      employeeCompensationId: [0, Validators.required],
      salaryTypeId: [null, Validators.required],
      salary: [null, Validators.required],
      effectiveDate: [null, Validators.required],
      remarks: [null],
      compensationTableHash: [null]
    });
  }

  getCurrentId() {
    return this.compensationForm.get("employeeCompensationId").value;
  }

  submitForm() {
    const id = this.getCurrentId();
    if (id == 0) {
      this.store$.dispatch(
        new CompensationActions.CreateCompensation(this.compensationForm.value)
      );
    } else {
      this.store$.dispatch(
        new CompensationActions.UpdateCompensation(this.compensationForm.value)
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
