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

import * as fromContractType from "./../../store/reducers/contract-type.reducer";
import * as ContractTypeActions from "./../../store/actions/contract-type.action";
import * as ContractTypeSelectors from "./../../store/selectors/contract-type.selector";

import { ContractType } from "./../../models/contract-type.model";

@Component({
  selector: "app-contract-type-form",
  templateUrl: "./contract-type-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractTypeFormComponent implements OnInit {
  contractTypeForm: FormGroup;
  selectedContractType$: Observable<ContractType>;
  isSaving$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromContractType.State>,
    private dialogRef: MatDialogRef<ContractTypeFormComponent>
  ) {}

  ngOnInit() {
    this.createForm();
    this.selectedContractType$ = this.store$.select(
      ContractTypeSelectors.getContractTypeSelectedEntityData
    );

    this.isSaving$ = this.store$.select(
      ContractTypeSelectors.getContractTypeIsSavingLoading
    );

    this.selectedContractType$.pipe(take(1)).subscribe(response => {
      if (response != null) {
        this.contractTypeForm.setValue({
          contractTypeId: response.contractTypeId,
          contractTypeCode: response.contractTypeCode,
          contractTypeName: response.contractTypeName,
          contractTypeTableHash: response.contractTypeTableHash
        });
      }
    });
  }

  createForm() {
    this.contractTypeForm = this.fb.group({
      contractTypeId: [0, Validators.required],
      contractTypeCode: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(20)],
        updateOn: "blur"
      }),
      contractTypeName: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(150)],
        updateOn: "blur"
      }),
      contractTypeTableHash: [null]
    });
  }

  getCurrentId() {
    return this.contractTypeForm.get("contractTypeId").value;
  }

  submitForm() {
    const id = this.getCurrentId();
    if (id == 0) {
      this.store$.dispatch(
        new ContractTypeActions.CreateContractType(this.contractTypeForm.value)
      );
    } else {
      this.store$.dispatch(
        new ContractTypeActions.UpdateContractType(this.contractTypeForm.value)
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
