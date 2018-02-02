import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";
import * as fromPersonal from "./../../store/reducers/employee-personal.reducer";
import * as PersonalActions from "./../../store/actions/employee-personal.action";
import * as PersonalSelectors from "./../../store/selectors/employee-personal.selector";

import { EmployeePersonal } from "./../../models/employee-personal.model";

@Component({
  selector: "app-employee-personal",
  templateUrl: "./employee-personal.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeePersonalComponent implements OnInit {
  personalForm: FormGroup;
  civilStatuses: string[] = ["Single", "Married", "Divorced", "Widowed"];
  personalData: Observable<EmployeePersonal>;
  isLoading$: Observable<boolean>;
  currentId: number = 0;

  constructor(
    private fb: FormBuilder,
    private store$: Store<fromPersonal.State>
  ) {}

  ngOnInit() {
    this.createForm();
    this.personalData = this.store$.select(PersonalSelectors.getPersonalData);
    this.isLoading$ = this.store$.select(
      PersonalSelectors.getPersonalIsLoading
    );
    this.personalData.pipe(take(2)).subscribe(data => {
      if (data !== null) {
        const {
          employeeId,
          employeeNumber,
          firstName,
          middleName,
          lastName,
          birthday,
          placeOfBirth,
          civilStatus,
          citizenship,
          religion
        } = data;
        this.personalForm.setValue({
          employeeId,
          employeeNumber,
          firstName,
          middleName,
          lastName,
          placeOfBirth,
          civilStatus,
          citizenship,
          religion,
          birthday: new Date(birthday)
        });
        this.currentId = data.employeeId;
      }
    });
  }

  createForm(): void {
    this.personalForm = this.fb.group({
      employeeId: [null, Validators.required],
      employeeNumber: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(20)],
        updateOn: "blur"
      }),
      firstName: [null, [Validators.required, Validators.maxLength(150)]],
      middleName: [null, [Validators.required, Validators.maxLength(150)]],
      lastName: [null, [Validators.required, Validators.maxLength(150)]],
      birthday: [null, Validators.required],
      placeOfBirth: [null, [Validators.required, Validators.maxLength(150)]],
      civilStatus: [null, Validators.required],
      citizenship: [null, [Validators.required, Validators.maxLength(50)]],
      religion: [null, [Validators.required, Validators.maxLength(150)]]
    });
  }

  save() {
    this.store$.dispatch(
      new PersonalActions.SavePersonalInfo(this.personalForm.value)
    );
  }
}
