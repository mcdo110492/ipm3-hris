import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material/dialog";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";

import * as fromEmploymentStatus from "./../../store/reducers/employment-status.reducer";
import * as EmploymentStatusActions from "./../../store/actions/employment-status.action";
import * as EmploymentStatusSelectors from "./../../store/selectors/employment-status.selector";

import { EmploymentStatus } from "./../../models/employment-status.model";

@Component({
  selector: "app-employment-status-form",
  templateUrl: "./employment-status-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmploymentStatusFormComponent implements OnInit {
  employmentStatusForm: FormGroup;
  selectedEmploymentStatus$: Observable<EmploymentStatus>;
  isSaving$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromEmploymentStatus.State>,
    private dialogRef: MatDialogRef<EmploymentStatusFormComponent>
  ) {}

  ngOnInit() {
    this.createForm();
    this.selectedEmploymentStatus$ = this.store$.select(
      EmploymentStatusSelectors.getEmploymentStatusSelectedEntityData
    );

    this.isSaving$ = this.store$.select(
      EmploymentStatusSelectors.getEmploymentStatusIsSavingLoading
    );

    this.selectedEmploymentStatus$.pipe(take(1)).subscribe(response => {
      if (response != null) {
        this.employmentStatusForm.setValue({
          employmentStatusId: response.employmentStatusId,
          employmentStatusCode: response.employmentStatusCode,
          employmentStatusName: response.employmentStatusName
        });
      }
    });
  }

  createForm() {
    this.employmentStatusForm = this.fb.group({
      employmentStatusId: [0, Validators.required],
      employmentStatusCode: [
        null,
        [Validators.required, Validators.maxLength(20)]
      ],
      employmentStatusName: [
        null,
        [Validators.required, Validators.maxLength(150)]
      ]
    });
  }

  getCurrentId() {
    return this.employmentStatusForm.get("employmentStatusId").value;
  }

  submitForm() {
    const id = this.getCurrentId();
    if (id == 0) {
      this.store$.dispatch(
        new EmploymentStatusActions.CreateEmploymentStatus(
          this.employmentStatusForm.value
        )
      );
    } else {
      this.store$.dispatch(
        new EmploymentStatusActions.UpdateEmploymentStatus(
          this.employmentStatusForm.value
        )
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
