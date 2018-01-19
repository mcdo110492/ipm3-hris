import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";

import * as EducationTertiaryActions from "./../../store/actions/employee-education-tertiary.action";
import * as fromEducationTertiary from "./../../store/reducers/employee-education-tertiary.reducer";

@Component({
  selector: "app-employee-education",
  templateUrl: "./employee-education.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeEducationComponent implements OnInit {
  constructor(private tertiaryStore$: Store<fromEducationTertiary.State>) {}

  ngOnInit() {
    this.tertiaryStore$.dispatch(
      new EducationTertiaryActions.LoadEducationTertiary()
    );
  }
}
