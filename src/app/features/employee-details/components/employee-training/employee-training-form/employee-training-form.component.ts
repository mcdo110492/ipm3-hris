import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material/dialog";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";

import * as TrainingActions from "./../../../store/actions/employee-training.action";
import * as fromTraining from "./../../../store/reducers/employee-training.reducer";
import * as CompnesationSelectors from "./../../../store/selectors/employee-training.selector";

import { EmployeeTraining } from "./../../../models/employee-training.model";
import { SalaryType } from "@app/features/salary-type/models";

@Component({
  selector: "app-employee-training-form",
  templateUrl: "./employee-training-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeTrainingFormComponent implements OnInit {
  trainingForm: FormGroup;
  trainingData$: Observable<EmployeeTraining>;
  isSavingLoading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromTraining.State>,
    private dialogRef: MatDialogRef<EmployeeTrainingFormComponent>
  ) {}

  ngOnInit() {
    this.createForm();

    this.trainingData$ = this.store$.select(
      CompnesationSelectors.getTrainingSelectedEntityData
    );
    this.isSavingLoading$ = this.store$.select(
      CompnesationSelectors.getTrainingIsSavingLoading
    );

    this.trainingData$.pipe(take(1)).subscribe((data: EmployeeTraining) => {
      if (data != null) {
        this.trainingForm.patchValue(data);
      }
    });
  }

  createForm() {
    this.trainingForm = this.fb.group({
      employeeTrainingId: [0, Validators.required],
      trainingName: [null, [Validators.required, Validators.maxLength(150)]],
      trainingTitle: [null, [Validators.required, Validators.maxLength(150)]],
      trainingFrom: [null, Validators.required],
      trainingTo: [null, Validators.required],
      trainingTableHash: [null]
    });
  }

  getCurrentId() {
    return this.trainingForm.get("employeeTrainingId").value;
  }

  submitForm() {
    const id = this.getCurrentId();
    if (id == 0) {
      this.store$.dispatch(
        new TrainingActions.CreateTraining(this.trainingForm.value)
      );
    } else {
      this.store$.dispatch(
        new TrainingActions.UpdateTraining(this.trainingForm.value)
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
