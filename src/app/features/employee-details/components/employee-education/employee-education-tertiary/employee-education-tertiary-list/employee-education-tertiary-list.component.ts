import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as EducationTertiaryActions from "./../../../../store/actions/employee-education-tertiary.action";
import * as fromEducationTertiary from "./../../../../store/reducers/employee-education-tertiary.reducer";
import * as EducationTertiarySelectors from "./../../../../store/selectors/employee-education-tertiary.selector";

import { EmployeeEducationTertiary } from "./../../../../models/employee-education-tertiary.model";
import { EmployeeEducationTertiaryTableDataSource } from "./employee-education-tertiary.datasource";

import { EmployeeEducationTertiaryService } from "./../../../../services/employee-education-tertiary.service";

@Component({
  selector: "app-employee-education-tertiary-list",
  templateUrl: "./employee-education-tertiary-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeEducationTertiaryListComponent implements OnInit {
  displayedColumns = [
    "educTertiarySchool",
    "educTertiaryAddress",
    "educTertiaryCourse",
    "educTertiaryYear",
    "actions"
  ];
  dataSource: EmployeeEducationTertiaryTableDataSource | null;
  collections$: Observable<EmployeeEducationTertiary[]>;
  isLoading$: Observable<boolean>;
  isLoaded$: Observable<boolean>;
  constructor(
    private store$: Store<fromEducationTertiary.State>,
    private service: EmployeeEducationTertiaryService
  ) {}

  ngOnInit() {
    this.collections$ = this.store$.select(
      EducationTertiarySelectors.getEducationTertiaryData
    );
    this.isLoading$ = this.store$.select(
      EducationTertiarySelectors.getEducationTertiaryIsLoading
    );
    this.isLoaded$ = this.store$.select(
      EducationTertiarySelectors.getEducationTertiaryIsLoaded
    );

    this.dataSource = new EmployeeEducationTertiaryTableDataSource(
      this.collections$
    );

    this.store$.dispatch(new EducationTertiaryActions.LoadEducationTertiary());
  }

  create() {
    this.store$.dispatch(
      new EducationTertiaryActions.SelectEducationTertiary(null)
    );
    this.service.openForm();
  }

  update(id: number) {
    this.store$.dispatch(
      new EducationTertiaryActions.SelectEducationTertiary(id)
    );
    this.service.openForm();
  }
}
