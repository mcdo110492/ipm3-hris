import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as CompensationActions from "./../../../store/actions/employee-compensation.action";
import * as fromCompensation from "./../../../store/reducers/employee-compensation.reducer";
import * as CompensationSelectors from "./../../../store/selectors/employee-compensation.selector";

import { EmployeeCompensation } from "./../../../models/employee-compensation.model";
import { EmployeeCompensationTableDataSource } from "./employee-compensation-list.datasource";

import { EmployeeCompensationService } from "./../../../services/employee-compensation.service";

@Component({
  selector: "app-employee-compensation-list",
  templateUrl: "./employee-compensation-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeCompensationListComponent implements OnInit {
  displayedColumns = [
    "salaryType",
    "salary",
    "effectiveDate",
    "remarks",
    "actions"
  ];
  dataSource: EmployeeCompensationTableDataSource | null;
  collections$: Observable<EmployeeCompensation[]>;
  isLoading$: Observable<boolean>;
  isLoaded$: Observable<boolean>;
  constructor(
    private store$: Store<fromCompensation.State>,
    private service: EmployeeCompensationService
  ) {}

  ngOnInit() {
    this.collections$ = this.store$.select(
      CompensationSelectors.getCompensationData
    );
    this.isLoading$ = this.store$.select(
      CompensationSelectors.getCompensationIsLoading
    );
    this.isLoaded$ = this.store$.select(
      CompensationSelectors.getCompensationIsLoaded
    );

    this.dataSource = new EmployeeCompensationTableDataSource(
      this.collections$
    );

    this.store$.dispatch(new CompensationActions.LoadCompensation());
  }

  create() {
    this.store$.dispatch(new CompensationActions.SelectCompensation(null));
    this.service.openForm();
  }

  update(id: number) {
    this.store$.dispatch(new CompensationActions.SelectCompensation(id));
    this.service.openForm();
  }
}
