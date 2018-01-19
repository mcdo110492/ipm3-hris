import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as EducationVocationalActions from "./../../../../store/actions/employee-education-vocational.action";
import * as fromEducationVocational from "./../../../../store/reducers/employee-education-vocational.reducer";
import * as EducationVocationalSelectors from "./../../../../store/selectors/employee-education-vocational.selector";

import { EmployeeEducationVocational } from "./../../../../models/employee-education-vocational.model";
import { EmployeeEducationVocationalTableDataSource } from "./employee-education-vocational-list.datasource";

import { EmployeeEducationVocationalService } from "./../../../../services/employee-education-vocational.service";

@Component({
  selector: "app-employee-education-vocational-list",
  templateUrl: "./employee-education-vocational-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeEducationVocationalListComponent implements OnInit {
  displayedColumns = [
    "educVocationalSchool",
    "educVocationalAddress",
    "educVocationalCourse",
    "educVocationalYear",
    "actions"
  ];
  dataSource: EmployeeEducationVocationalTableDataSource | null;
  collections$: Observable<EmployeeEducationVocational[]>;
  isLoading$: Observable<boolean>;
  isLoaded$: Observable<boolean>;
  constructor(
    private store$: Store<fromEducationVocational.State>,
    private service: EmployeeEducationVocationalService
  ) {}

  ngOnInit() {
    this.collections$ = this.store$.select(
      EducationVocationalSelectors.getEducationVocationalData
    );
    this.isLoading$ = this.store$.select(
      EducationVocationalSelectors.getEducationVocationalIsLoading
    );
    this.isLoaded$ = this.store$.select(
      EducationVocationalSelectors.getEducationVocationalIsLoaded
    );

    this.dataSource = new EmployeeEducationVocationalTableDataSource(
      this.collections$
    );

    this.store$.dispatch(
      new EducationVocationalActions.LoadEducationVocational()
    );
  }

  create() {
    this.store$.dispatch(
      new EducationVocationalActions.SelectEducationVocational(null)
    );
    this.service.openForm();
  }

  update(id: number) {
    this.store$.dispatch(
      new EducationVocationalActions.SelectEducationVocational(id)
    );
    this.service.openForm();
  }
}
