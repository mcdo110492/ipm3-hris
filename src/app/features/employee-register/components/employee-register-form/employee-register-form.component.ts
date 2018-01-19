import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnDestroy
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

import { Subscription } from "rxjs/Subscription";
import { take, debounceTime } from "rxjs/operators";

import { EmployeeRegister, Personal, Employment } from "./../../models";
import { Position } from "@app/features/position/models";
import { EmploymentStatus } from "@app/features/employment-status/models";
import { EmployeeStatus } from "@app/features/employee-status/models";
import { ContractType } from "@app/features/contract-type/models";

import { Store } from "@ngrx/store";
import * as fromEmployeeRegister from "./../../store/reducers/employee-register.reducer";
import * as EmployeeRegisterActions from "./../../store/actions/employee-register.action";
import * as EmployeeRegisterSelectors from "./../../store/selectors/employee-register.selector";

@Component({
  selector: "app-employee-register-form",
  templateUrl: "./employee-register-form.component.html"
})
export class EmployeeRegisterFormComponent implements OnInit, OnDestroy {
  @Input() positions: Position[];
  @Input() employmentStatus: EmploymentStatus[];
  @Input() employeeStatus: EmployeeStatus[];
  @Input() contractTypes: ContractType[];
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  personalForm: FormGroup;
  employmentForm: FormGroup;
  doneForm: FormGroup;
  civilStatus: string[] = ["Single", "Married", "Divorced", "Widowed"];
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private store$: Store<fromEmployeeRegister.State>
  ) {}

  ngOnInit() {
    this.createForm();

    this.store$
      .select(EmployeeRegisterSelectors.getEmployeeRegisterData)
      .pipe(take(1))
      .subscribe((formData: EmployeeRegister) => {
        if (formData !== null) {
          this.personalForm.setValue(formData.personal);
          this.employmentForm.setValue(formData.employment);
        }
      });

    this.subscription = this.personalForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((personal: Personal) => {
        this.save(personal, this.employmentForm.value);
      });

    this.subscription.add(
      this.employmentForm.valueChanges
        .pipe(debounceTime(1000))
        .subscribe((employment: Employment) => {
          this.save(this.personalForm.value, employment);
        })
    );
  }

  createForm() {
    this.personalForm = this.fb.group({
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

    this.employmentForm = this.fb.group({
      positionId: [null, Validators.required],
      employeeStatusId: [null, Validators.required],
      employmentStatusId: [null, Validators.required],
      dateHired: [null, Validators.required],
      contractStart: [null, Validators.required],
      contractEnd: [null, Validators.required],
      contractTypeId: [null, Validators.required]
    });
  }

  save(personal: Personal, employment: Employment) {
    const data: EmployeeRegister = {
      personal,
      employment
    };

    this.store$.dispatch(new EmployeeRegisterActions.Save(data));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
