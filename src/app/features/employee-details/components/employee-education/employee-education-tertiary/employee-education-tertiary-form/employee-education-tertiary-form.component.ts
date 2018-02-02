import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material/dialog";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";

import * as EducationTertiaryActions from "./../../../../store/actions/employee-education-tertiary.action";
import * as fromEducationTertiary from "./../../../../store/reducers/employee-education-tertiary.reducer";
import * as CompnesationSelectors from "./../../../../store/selectors/employee-education-tertiary.selector";

import { EmployeeEducationTertiary } from "./../../../../models/employee-education-tertiary.model";

@Component({
  selector: "app-employee-education-tertiary-form",
  templateUrl: "./employee-education-tertiary-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeEducationTertiaryFormComponent implements OnInit {
  educationTertiaryForm: FormGroup;
  educationTertiaryData$: Observable<EmployeeEducationTertiary>;
  isSavingLoading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromEducationTertiary.State>,
    private dialogRef: MatDialogRef<EmployeeEducationTertiaryFormComponent>
  ) {}

  ngOnInit() {
    this.createForm();

    this.educationTertiaryData$ = this.store$.select(
      CompnesationSelectors.getEducationTertiarySelectedEntityData
    );
    this.isSavingLoading$ = this.store$.select(
      CompnesationSelectors.getEducationTertiaryIsSavingLoading
    );

    this.educationTertiaryData$
      .pipe(take(1))
      .subscribe((data: EmployeeEducationTertiary) => {
        if (data != null) {
          this.educationTertiaryForm.patchValue(data);
        }
      });
  }

  createForm() {
    this.educationTertiaryForm = this.fb.group({
      educTertiaryId: [0, Validators.required],
      educTertiarySchool: [
        null,
        [Validators.required, Validators.maxLength(150)]
      ],
      educTertiaryAddress: [
        null,
        [Validators.required, Validators.maxLength(150)]
      ],
      educTertiaryCourse: [
        null,
        [Validators.required, Validators.maxLength(150)]
      ],
      educTertiaryYear: [null, [Validators.required, Validators.maxLength(20)]],
      educTertiaryTableHash: [null]
    });
  }

  getCurrentId() {
    return this.educationTertiaryForm.get("educTertiaryId").value;
  }

  submitForm() {
    const id = this.getCurrentId();
    if (id == 0) {
      this.store$.dispatch(
        new EducationTertiaryActions.CreateEducationTertiary(
          this.educationTertiaryForm.value
        )
      );
    } else {
      this.store$.dispatch(
        new EducationTertiaryActions.UpdateEducationTertiary(
          this.educationTertiaryForm.value
        )
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
