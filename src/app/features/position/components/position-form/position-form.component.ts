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

import * as fromPosition from "./../../store/reducers/position.reducer";
import * as PositionActions from "./../../store/actions/position.action";
import * as PositionSelectors from "./../../store/selectors/position.selector";

import { Position } from "./../../models/position.model";

@Component({
  selector: "app-position-form",
  templateUrl: "./position-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionFormComponent implements OnInit {
  positionForm: FormGroup;
  selectedPosition$: Observable<Position>;
  isSaving$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromPosition.State>,
    private dialogRef: MatDialogRef<PositionFormComponent>
  ) {}

  ngOnInit() {
    this.createForm();
    this.selectedPosition$ = this.store$.select(
      PositionSelectors.getPositionSelectedEntityData
    );

    this.isSaving$ = this.store$.select(
      PositionSelectors.getPositionIsSavingLoading
    );

    this.selectedPosition$.pipe(take(1)).subscribe(response => {
      if (response != null) {
        this.positionForm.setValue({
          positionId: response.positionId,
          positionCode: response.positionCode,
          positionName: response.positionName,
          positionTableHash: response.positionTableHash
        });
      }
    });
  }

  createForm() {
    this.positionForm = this.fb.group({
      positionId: [0, Validators.required],
      positionCode: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(20)],
        updateOn: "blur"
      }),
      positionName: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(150)],
        updateOn: "blur"
      }),
      positionTableHash: [null]
    });
  }

  getCurrentId() {
    return this.positionForm.get("positionId").value;
  }

  submitForm() {
    const id = this.getCurrentId();
    if (id == 0) {
      this.store$.dispatch(
        new PositionActions.CreatePosition(this.positionForm.value)
      );
    } else {
      this.store$.dispatch(
        new PositionActions.UpdatePosition(this.positionForm.value)
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
