import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";

import * as HealthActions from "./../../store/actions/employee-health.action";
import * as fromHealth from "./../../store/reducers/employee-health.reducer";
import * as HealthSelectors from "./../../store/selectors/employee-health.selector";

import { EmployeeHealth } from "./../../models/employee-health.model";

@Component({
  selector: "app-employee-health",
  templateUrl: "./employee-health.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeHealthComponent implements OnInit {
  healthForm: FormGroup;
  healthData$: Observable<EmployeeHealth>;
  isLoading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromHealth.State>
  ) {}

  ngOnInit() {
    this.createForm();
    this.healthData$ = this.store$.select(HealthSelectors.getHealthData);
    this.isLoading$ = this.store$.select(HealthSelectors.getHealthIsLoading);

    this.store$.dispatch(new HealthActions.LoadHealthInfo());

    this.healthData$.pipe(take(2)).subscribe((data: EmployeeHealth) => {
      if (data !== null) {
        this.healthForm.patchValue(data);
      }
    });
  }

  createForm() {
    this.healthForm = this.fb.group({
      employeeHealthId: [null, Validators.required],
      employeeId: [null],
      height: [null, Validators.required],
      weight: [null, Validators.required],
      bloodType: [null, Validators.required]
    });
  }

  save() {
    this.store$.dispatch(
      new HealthActions.SaveHealthInfo(this.healthForm.value)
    );
  }
}
