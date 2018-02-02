import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";

import * as EducationPrimaryActions from "./../../../store/actions/employee-education-primary.action";
import * as fromEducationPrimary from "./../../../store/reducers/employee-education-primary.reducer";
import * as EducationPrimarySelector from "./../../../store/selectors/employee-education-primary.selector";

import { EmployeeEducationPrimary } from "./../../../models/employee-education-primary.model";

@Component({
  selector: "app-employee-education-primary",
  templateUrl: "./employee-education-primary.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeEducationPrimaryComponent implements OnInit {
  primaryForm: FormGroup;
  isLoading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromEducationPrimary.State>
  ) {}

  ngOnInit() {
    this.createForm();
    this.isLoading$ = this.store$.select(
      EducationPrimarySelector.getEducationPrimaryIsLoading
    );
    this.store$
      .select(EducationPrimarySelector.getEducationPrimaryData)
      .pipe(take(2))
      .subscribe(data => {
        if (data !== null) {
          this.primaryForm.patchValue(data);
        }
      });

    this.store$.dispatch(
      new EducationPrimaryActions.LoadEducationPrimaryInfo()
    );
  }

  createForm() {
    this.primaryForm = this.fb.group({
      educPrimaryId: [0, Validators.required],
      educPrimarySchool: [
        null,
        [Validators.required, Validators.maxLength(150)]
      ],
      educPrimaryAddress: [
        null,
        [Validators.required, Validators.maxLength(150)]
      ],
      educPrimaryYear: [null, [Validators.required, Validators.maxLength(20)]]
    });
  }

  save() {
    this.store$.dispatch(
      new EducationPrimaryActions.SaveEducationPrimaryInfo(
        this.primaryForm.value
      )
    );
  }
}
