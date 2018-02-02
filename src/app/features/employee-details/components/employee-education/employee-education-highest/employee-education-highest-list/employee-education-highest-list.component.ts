import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as EducationHighestActions from "./../../../../store/actions/employee-education-highest.action";
import * as fromEducationHighest from "./../../../../store/reducers/employee-education-highest.reducer";
import * as EducationHighestSelectors from "./../../../../store/selectors/employee-education-highest.selector";

import { EmployeeEducationHighest } from "./../../../../models/employee-education-highest.model";
import { EmployeeEducationHighestTableDataSource } from "./employee-education-highest-list.datasource";

import { EmployeeEducationHighestService } from "./../../../../services/employee-education-highest.service";

@Component({
  selector: "app-employee-education-highest-list",
  templateUrl: "./employee-education-highest-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeEducationHighestListComponent implements OnInit {
  displayedColumns = [
    "educHighestSchool",
    "educHighestAddress",
    "educHighestCourse",
    "educHighestYear",
    "actions"
  ];
  dataSource: EmployeeEducationHighestTableDataSource | null;
  collections$: Observable<EmployeeEducationHighest[]>;
  isLoading$: Observable<boolean>;
  isLoaded$: Observable<boolean>;
  constructor(
    private store$: Store<fromEducationHighest.State>,
    private service: EmployeeEducationHighestService
  ) {}

  ngOnInit() {
    this.collections$ = this.store$.select(
      EducationHighestSelectors.getEducationHighestData
    );
    this.isLoading$ = this.store$.select(
      EducationHighestSelectors.getEducationHighestIsLoading
    );
    this.isLoaded$ = this.store$.select(
      EducationHighestSelectors.getEducationHighestIsLoaded
    );

    this.dataSource = new EmployeeEducationHighestTableDataSource(
      this.collections$
    );

    this.store$.dispatch(new EducationHighestActions.LoadEducationHighest());
  }

  create() {
    this.store$.dispatch(
      new EducationHighestActions.SelectEducationHighest(null)
    );
    this.service.openForm();
  }

  update(id: number) {
    this.store$.dispatch(
      new EducationHighestActions.SelectEducationHighest(id)
    );
    this.service.openForm();
  }
}
