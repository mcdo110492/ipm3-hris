import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

import { MatDialogRef } from "@angular/material/dialog";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";

import * as fromEmployeeStatus from "./../../store/reducers/employee-status.reducer";
import * as EmployeeStatusActions from "./../../store/actions/employee-status.action";
import * as EmployeeStatusSelectors from "./../../store/selectors/employee-status.selector";

import { EmployeeStatus } from "./../../models/employee-status.model";

@Component({
  selector: "app-employee-status-form",
  templateUrl: "./employee-status-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeStatusFormComponent implements OnInit {
  employeeStatusForm: FormGroup;
  SelectedEmployeeStatus$: Observable<EmployeeStatus>;
  isSaving$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromEmployeeStatus.State>,
    private dialogRef: MatDialogRef<EmployeeStatusFormComponent>
  ) {}

  ngOnInit() {
    this.createForm();
    this.SelectedEmployeeStatus$ = this.store$.select(
      EmployeeStatusSelectors.getEmployeeStatusSelectedEntityData
    );

    this.isSaving$ = this.store$.select(
      EmployeeStatusSelectors.getEmployeeStatusIsSavingLoading
    );

    this.SelectedEmployeeStatus$.pipe(take(1)).subscribe(response => {
      if (response != null) {
        this.employeeStatusForm.setValue({
          employeeStatusId: response.employeeStatusId,
          employeeStatusCode: response.employeeStatusCode,
          employeeStatusName: response.employeeStatusName,
          employeeStatusTableHash: response.employeeStatusTableHash
        });
      }
    });
  }

  createForm() {
    this.employeeStatusForm = this.fb.group({
      employeeStatusId: [0, Validators.required],
      employeeStatusCode: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(20)],
        updateOn: "blur"
      }),
      employeeStatusName: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(150)],
        updateOn: "blur"
      }),
      employeeStatusTableHash: [null]
    });
  }

  getCurrentId() {
    return this.employeeStatusForm.get("employeeStatusId").value;
  }

  submitForm() {
    const id = this.getCurrentId();
    if (id == 0) {
      this.store$.dispatch(
        new EmployeeStatusActions.CreateEmployeeStatus(
          this.employeeStatusForm.value
        )
      );
    } else {
      this.store$.dispatch(
        new EmployeeStatusActions.UpdateEmployeeStatus(
          this.employeeStatusForm.value
        )
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
