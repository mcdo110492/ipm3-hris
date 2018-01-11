import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { PageEvent, Sort } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as EmployeeListActions from "./../../store/actions";
import * as fromEmployeeList from "./../../store/reducers/employee-list.reducer";
import * as EmployeeListSelectors from "./../../store/selectors/employee-list.selector";
import * as RouterActions from "@app/store/actions";
import * as fromRootRouter from "@app/store/reducers";

import { EmployeeListTableDataSource } from "./employee-list.datasource";
import { EmployeeList } from "./../../models/employee-list.model";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent implements OnInit {
  displayedColumns = [
    "profileImage",
    "employeeNumber",
    "lastName",
    "positionName",
    "empploymentStatusName",
    "employeeStatusName",
    "actions"
  ];
  dataSource: EmployeeListTableDataSource | null;
  collections$: Observable<EmployeeList[]>;
  pageLength$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  pageSizeOptions = [5, 10, 15, 30, 50, 100];

  searchQuery$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(
    private store$: Store<fromEmployeeList.State>,
    private routerStore$: Store<fromRootRouter.State>
  ) {}

  ngOnInit() {
    this.collections$ = this.store$.select(
      EmployeeListSelectors.getEmployeeListData
    );
    this.pageLength$ = this.store$.select(
      EmployeeListSelectors.getEmployeeListPageLength
    );
    this.pageSize$ = this.store$.select(
      EmployeeListSelectors.getEmployeeListPageSize
    );
    this.pageIndex$ = this.store$.select(
      EmployeeListSelectors.getEmployeeListPageIndex
    );
    this.searchQuery$ = this.store$.select(
      EmployeeListSelectors.getEmployeeListSearchQuery
    );

    this.isLoading$ = this.store$.select(
      EmployeeListSelectors.getEmployeeListIsLoading
    );

    this.dataSource = new EmployeeListTableDataSource(this.collections$);
    this.store$.dispatch(new EmployeeListActions.LoadEmployeeList());
  }

  pageEvent(ev: PageEvent) {
    this.store$.dispatch(
      new EmployeeListActions.PageEventEmployeeList(ev.pageSize, ev.pageIndex)
    );
    this.store$.dispatch(new EmployeeListActions.LoadEmployeeList());
  }

  sortEvent(ev: Sort) {
    this.store$.dispatch(
      new EmployeeListActions.SortEventEmployeeList(ev.active, ev.direction)
    );
    this.store$.dispatch(new EmployeeListActions.LoadEmployeeList());
  }

  search(ev) {
    this.store$.dispatch(new EmployeeListActions.SearchEmployeeList(ev));
  }

  goToDetails(data: EmployeeList) {
    this.routerStore$.dispatch(
      new RouterActions.Go({ path: [`employee/details/${data.employeeId}`] })
    );
  }
}
