import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material/dialog";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";

import * as EducationVocationalActions from "./../../../../store/actions/employee-education-vocational.action";
import * as fromEducationVocational from "./../../../../store/reducers/employee-education-vocational.reducer";
import * as VocationalSelectors from "./../../../../store/selectors/employee-education-vocational.selector";

import { EmployeeEducationVocational } from "./../../../../models/employee-education-vocational.model";

@Component({
  selector: "app-employee-education-vocational-form",
  templateUrl: "./employee-education-vocational-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeEducationVocationalFormComponent implements OnInit {
  educationVocationalForm: FormGroup;
  educationVocationalData$: Observable<EmployeeEducationVocational>;
  isSavingLoading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromEducationVocational.State>,
    private dialogRef: MatDialogRef<EmployeeEducationVocationalFormComponent>
  ) {}

  ngOnInit() {
    this.createForm();

    this.educationVocationalData$ = this.store$.select(
      VocationalSelectors.getEducationVocationalSelectedEntityData
    );
    this.isSavingLoading$ = this.store$.select(
      VocationalSelectors.getEducationVocationalIsSavingLoading
    );

    this.educationVocationalData$
      .pipe(take(1))
      .subscribe((data: EmployeeEducationVocational) => {
        if (data != null) {
          this.educationVocationalForm.patchValue(data);
        }
      });
  }

  createForm() {
    this.educationVocationalForm = this.fb.group({
      educVocationalId: [0, Validators.required],
      educVocationalSchool: [
        null,
        [Validators.required, Validators.maxLength(150)]
      ],
      educVocationalAddress: [
        null,
        [Validators.required, Validators.maxLength(150)]
      ],
      educVocationalCourse: [
        null,
        [Validators.required, Validators.maxLength(150)]
      ],
      educVocationalYear: [
        null,
        [Validators.required, Validators.maxLength(20)]
      ],
      educVocationalTableHash: [null]
    });
  }

  getCurrentId() {
    return this.educationVocationalForm.get("educVocationalId").value;
  }

  submitForm() {
    const id = this.getCurrentId();
    if (id == 0) {
      this.store$.dispatch(
        new EducationVocationalActions.CreateEducationVocational(
          this.educationVocationalForm.value
        )
      );
    } else {
      this.store$.dispatch(
        new EducationVocationalActions.UpdateEducationVocational(
          this.educationVocationalForm.value
        )
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
