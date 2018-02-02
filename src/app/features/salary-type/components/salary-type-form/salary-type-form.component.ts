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

import * as fromSalaryType from "./../../store/reducers/salary-type.reducer";
import * as SalaryTypeActions from "./../../store/actions/salary-type.action";
import * as SalaryTypeSelectors from "./../../store/selectors/salary-type.selector";

import { SalaryType } from "./../../models/salary-type.model";

@Component({
  selector: "app-salary-type-form",
  templateUrl: "./salary-type-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalaryTypeFormComponent implements OnInit {
  salaryTypeForm: FormGroup;
  selectedSalaryType$: Observable<SalaryType>;
  isSaving$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromSalaryType.State>,
    private dialogRef: MatDialogRef<SalaryTypeFormComponent>
  ) {}

  ngOnInit() {
    this.createForm();
    this.selectedSalaryType$ = this.store$.select(
      SalaryTypeSelectors.getSalaryTypeSelectedEntityData
    );

    this.isSaving$ = this.store$.select(
      SalaryTypeSelectors.getSalaryTypeIsSavingLoading
    );

    this.selectedSalaryType$.pipe(take(1)).subscribe(response => {
      if (response != null) {
        this.salaryTypeForm.setValue({
          salaryTypeId: response.salaryTypeId,
          salaryTypeCode: response.salaryTypeCode,
          salaryTypeName: response.salaryTypeName,
          salaryTypeTableHash: response.salaryTypeTableHash
        });
      }
    });
  }

  createForm() {
    this.salaryTypeForm = this.fb.group({
      salaryTypeId: [0, Validators.required],
      salaryTypeCode: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(20)],
        updateOn: "blur"
      }),
      salaryTypeName: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(150)],
        updateOn: "blur"
      }),
      salaryTypeTableHash: [null]
    });
  }

  getCurrentId() {
    return this.salaryTypeForm.get("salaryTypeId").value;
  }

  submitForm() {
    const id = this.getCurrentId();
    if (id == 0) {
      this.store$.dispatch(
        new SalaryTypeActions.CreateSalaryType(this.salaryTypeForm.value)
      );
    } else {
      this.store$.dispatch(
        new SalaryTypeActions.UpdateSalaryType(this.salaryTypeForm.value)
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
