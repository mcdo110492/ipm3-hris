import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material/dialog";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";

import * as EducationHighestActions from "./../../../../store/actions/employee-education-highest.action";
import * as fromEducationHighest from "./../../../../store/reducers/employee-education-highest.reducer";
import * as CompnesationSelectors from "./../../../../store/selectors/employee-education-highest.selector";

import { EmployeeEducationHighest } from "./../../../../models/employee-education-highest.model";

@Component({
  selector: "app-employee-education-highest-form",
  templateUrl: "./employee-education-highest-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeEducationHighestFormComponent implements OnInit {
  educationHighestForm: FormGroup;
  educationHighestData$: Observable<EmployeeEducationHighest>;
  isSavingLoading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromEducationHighest.State>,
    private dialogRef: MatDialogRef<EmployeeEducationHighestFormComponent>
  ) {}

  ngOnInit() {
    this.createForm();

    this.educationHighestData$ = this.store$.select(
      CompnesationSelectors.getEducationHighestSelectedEntityData
    );
    this.isSavingLoading$ = this.store$.select(
      CompnesationSelectors.getEducationHighestIsSavingLoading
    );

    this.educationHighestData$
      .pipe(take(1))
      .subscribe((data: EmployeeEducationHighest) => {
        if (data != null) {
          this.educationHighestForm.patchValue(data);
        }
      });
  }

  createForm() {
    this.educationHighestForm = this.fb.group({
      educHighestId: [0, Validators.required],
      educHighestSchool: [
        null,
        [Validators.required, Validators.maxLength(150)]
      ],
      educHighestAddress: [
        null,
        [Validators.required, Validators.maxLength(150)]
      ],
      educHighestCourse: [
        null,
        [Validators.required, Validators.maxLength(150)]
      ],
      educHighestYear: [null, [Validators.required, Validators.maxLength(20)]],
      educHighestTableHash: [null]
    });
  }

  getCurrentId() {
    return this.educationHighestForm.get("educHighestId").value;
  }

  submitForm() {
    const id = this.getCurrentId();
    if (id == 0) {
      this.store$.dispatch(
        new EducationHighestActions.CreateEducationHighest(
          this.educationHighestForm.value
        )
      );
    } else {
      this.store$.dispatch(
        new EducationHighestActions.UpdateEducationHighest(
          this.educationHighestForm.value
        )
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
