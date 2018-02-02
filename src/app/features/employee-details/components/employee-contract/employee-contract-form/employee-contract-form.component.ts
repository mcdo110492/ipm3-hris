import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material/dialog";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";

import * as fromMasterData from "@master-data/store/reducers/master-data.reducer";
import * as MasterDataActions from "@master-data/store/actions/master-data.action";
import * as MasterDataSelectors from "@master-data/store/selectors/master-data.selector";

import * as ContractActions from "./../../../store/actions/employee-contract.action";
import * as fromContract from "./../../../store/reducers/employee-contract.reducer";
import * as CompnesationSelectors from "./../../../store/selectors/employee-contract.selector";

import { EmployeeContract } from "./../../../models/employee-contract.model";
import { ContractType } from "@app/features/contract-type/models";

@Component({
  selector: "app-employee-contract-form",
  templateUrl: "./employee-contract-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeContractFormComponent implements OnInit {
  contractForm: FormGroup;
  contractData$: Observable<EmployeeContract>;
  contractTypes$: Observable<ContractType[]>;
  isSavingLoading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromContract.State>,
    private master$: Store<fromMasterData.State>,
    private dialogRef: MatDialogRef<EmployeeContractFormComponent>
  ) {}

  ngOnInit() {
    this.createForm();

    this.master$.dispatch(new MasterDataActions.LoadAllContractType());

    this.contractData$ = this.store$.select(
      CompnesationSelectors.getContractSelectedEntityData
    );
    this.isSavingLoading$ = this.store$.select(
      CompnesationSelectors.getContractIsSavingLoading
    );
    this.contractTypes$ = this.master$.select(
      MasterDataSelectors.getContractTypes
    );

    this.contractData$.pipe(take(1)).subscribe((data: EmployeeContract) => {
      if (data != null) {
        this.contractForm.patchValue(data);
      }
    });
  }

  createForm() {
    this.contractForm = this.fb.group({
      employeeContractId: [0, Validators.required],
      contractTypeId: [null, Validators.required],
      contractStart: [null, Validators.required],
      contractEnd: [null, Validators.required],
      contractExtension: [null],
      remarks: [null],
      contractTableHash: [null]
    });
  }

  getCurrentId() {
    return this.contractForm.get("employeeContractId").value;
  }

  submitForm() {
    const id = this.getCurrentId();
    if (id == 0) {
      this.store$.dispatch(
        new ContractActions.CreateContract(this.contractForm.value)
      );
    } else {
      this.store$.dispatch(
        new ContractActions.UpdateContract(this.contractForm.value)
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
