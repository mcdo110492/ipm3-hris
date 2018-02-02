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

import * as EducationSecondaryActions from "./../../../store/actions/employee-education-secondary.action";
import * as fromEducationSecondary from "./../../../store/reducers/employee-education-secondary.reducer";
import * as EducationSecondarySelector from "./../../../store/selectors/employee-education-secondary.selector";

import { EmployeeEducationSecondary } from "./../../../models/employee-education-secondary.model";

@Component({
  selector: "app-employee-education-secondary",
  templateUrl: "./employee-education-secondary.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeEducationSecondaryComponent implements OnInit {
  secondaryForm: FormGroup;
  isLoading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromEducationSecondary.State>
  ) {}

  ngOnInit() {
    this.createForm();
    this.isLoading$ = this.store$.select(
      EducationSecondarySelector.getEducationSecondaryIsLoading
    );
    this.store$
      .select(EducationSecondarySelector.getEducationSecondaryData)
      .pipe(take(2))
      .subscribe(data => {
        if (data !== null) {
          this.secondaryForm.patchValue(data);
        }
      });

    this.store$.dispatch(
      new EducationSecondaryActions.LoadEducationSecondaryInfo()
    );
  }

  createForm() {
    this.secondaryForm = this.fb.group({
      educSecondaryId: [0, Validators.required],
      educSecondarySchool: [
        null,
        [Validators.required, Validators.maxLength(150)]
      ],
      educSecondaryAddress: [
        null,
        [Validators.required, Validators.maxLength(150)]
      ],
      educSecondaryYear: [null, [Validators.required, Validators.maxLength(20)]]
    });
  }

  save() {
    this.store$.dispatch(
      new EducationSecondaryActions.SaveEducationSecondaryInfo(
        this.secondaryForm.value
      )
    );
  }
}
