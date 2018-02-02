import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material/dialog";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";

import * as ClubActions from "./../../../store/actions/employee-club.action";
import * as fromClub from "./../../../store/reducers/employee-club.reducer";
import * as ClubSelectors from "./../../../store/selectors/employee-club.selector";

import { EmployeeClub } from "./../../../models/employee-club.model";
import { SalaryType } from "@app/features/salary-type/models";

@Component({
  selector: "app-employee-club-form",
  templateUrl: "./employee-club-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeClubFormComponent implements OnInit {
  clubForm: FormGroup;
  clubData$: Observable<EmployeeClub>;
  salaryTypes$: Observable<SalaryType[]>;
  isSavingLoading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromClub.State>,
    private dialogRef: MatDialogRef<EmployeeClubFormComponent>
  ) {}

  ngOnInit() {
    this.createForm();

    this.clubData$ = this.store$.select(
      ClubSelectors.getClubSelectedEntityData
    );
    this.isSavingLoading$ = this.store$.select(
      ClubSelectors.getClubIsSavingLoading
    );

    this.clubData$.pipe(take(1)).subscribe((data: EmployeeClub) => {
      if (data != null) {
        this.clubForm.patchValue(data);
      }
    });
  }

  createForm() {
    this.clubForm = this.fb.group({
      employeeClubId: [0, Validators.required],
      clubName: [null, [Validators.required, Validators.maxLength(150)]],
      clubPosition: [null, [Validators.required, Validators.maxLength(150)]],
      membershipDate: [null, Validators.required],
      clubTableHash: [null]
    });
  }

  getCurrentId() {
    return this.clubForm.get("employeeClubId").value;
  }

  submitForm() {
    const id = this.getCurrentId();
    if (id == 0) {
      this.store$.dispatch(new ClubActions.CreateClub(this.clubForm.value));
    } else {
      this.store$.dispatch(new ClubActions.UpdateClub(this.clubForm.value));
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
