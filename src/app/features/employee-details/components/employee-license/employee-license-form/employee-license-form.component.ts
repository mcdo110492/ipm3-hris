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

import * as LicenseActions from "./../../../store/actions/employee-license.action";
import * as fromLicense from "./../../../store/reducers/employee-license.reducer";
import * as LicenseSelectors from "./../../../store/selectors/employee-license.selector";

import { EmployeeLicense } from "./../../../models/employee-license.model";

@Component({
  selector: "app-employee-license-form",
  templateUrl: "./employee-license-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeLicenseFormComponent implements OnInit {
  licenseForm: FormGroup;
  licenseData$: Observable<EmployeeLicense>;
  isSavingLoading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromLicense.State>,
    private dialogRef: MatDialogRef<EmployeeLicenseFormComponent>
  ) {}

  ngOnInit() {
    this.createForm();

    this.licenseData$ = this.store$.select(
      LicenseSelectors.getLicenseSelectedEntityData
    );
    this.isSavingLoading$ = this.store$.select(
      LicenseSelectors.getLicenseIsSavingLoading
    );

    this.licenseData$.pipe(take(1)).subscribe((data: EmployeeLicense) => {
      if (data != null) {
        this.licenseForm.patchValue(data);
      }
    });
  }

  get currentId() {
    return this.licenseForm.get("employeeLicenseId").value;
  }

  createForm() {
    this.licenseForm = this.fb.group({
      employeeLicenseId: [0, Validators.required],
      licenseNumber: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(20)],
        updateOn: "blur"
      }),
      licenseType: [null, [Validators.required, Validators.maxLength(20)]],
      dateIssued: [null, Validators.required],
      dateExpiry: [null, Validators.required],
      licenseTableHash: [null]
    });
  }

  getCurrentId() {
    return this.licenseForm.get("employeeLicenseId").value;
  }

  submitForm() {
    const id = this.getCurrentId();
    if (id == 0) {
      this.store$.dispatch(
        new LicenseActions.CreateLicense(this.licenseForm.value)
      );
    } else {
      this.store$.dispatch(
        new LicenseActions.UpdateLicense(this.licenseForm.value)
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
