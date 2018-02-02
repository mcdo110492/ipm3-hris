import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";

import {
  SSSInputMask,
  TINInputMask,
  PhilHealthInputMask,
  PagIbigInputMask
} from "@shared/config";

import * as GovernmentActions from "./../../store/actions/employee-government.action";
import * as fromGovernment from "./../../store/reducers/employee-government.reducer";
import * as GovernmentSelectors from "./../../store/selectors/employee-government.selector";
import { EmployeeGovernment } from "@app/features/employee-details/models";

@Component({
  selector: "app-employee-government",
  templateUrl: "./employee-government.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeGovernmentComponent implements OnInit {
  governmentForm: FormGroup;
  governmentData$: Observable<EmployeeGovernment>;
  isLoading$: Observable<boolean>;
  sssMask = SSSInputMask;
  tinMask = TINInputMask;
  philHealthMask = PhilHealthInputMask;
  pagIbigMask = PagIbigInputMask;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromGovernment.State>
  ) {}

  ngOnInit() {
    this.createForm();
    this.governmentData$ = this.store$.select(
      GovernmentSelectors.getGovernmentData
    );
    this.isLoading$ = this.store$.select(
      GovernmentSelectors.getGovernmentIsLoading
    );

    this.store$.dispatch(new GovernmentActions.LoadGovernmentInfo());

    this.governmentData$.pipe(take(2)).subscribe((data: EmployeeGovernment) => {
      if (data !== null) {
        this.governmentForm.patchValue(data);
      }
    });
  }

  createForm() {
    this.governmentForm = this.fb.group({
      employeeGovernmentId: [null, Validators.required],
      sssNumber: [null, [Validators.required, Validators.maxLength(20)]],
      pagIbigNumber: [null, [Validators.required, Validators.maxLength(20)]],
      philHealthNumber: [null, [Validators.required, Validators.maxLength(20)]],
      tinNumber: [null, [Validators.required, Validators.maxLength(20)]]
    });
  }

  save() {
    this.store$.dispatch(
      new GovernmentActions.SaveGovernmentInfo(this.governmentForm.value)
    );
  }
}
