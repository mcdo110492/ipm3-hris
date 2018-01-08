import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { PageEvent, Sort } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as EmployeeStatusActions from "./../../store/actions";
import * as fromEmployeeStatus from "./../../store/reducers/employee-status.reducer";
import * as EmployeeStatusSelectors from "./../../store/selectors/employee-status.selector";

import { EmployeeStatusTableDataSource } from "./employee-status.datasource";
import { EmployeeStatus } from "./../../models/employee-status.model";

import { EmployeeStatusService } from "./../../services/employee-status.service";

@Component({
  selector: "app-employee-status",
  templateUrl: "./employee-status.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeStatusComponent implements OnInit {
  displayedColumns = ["employeeStatusCode", "employeeStatusName", "actions"];
  dataSource: EmployeeStatusTableDataSource | null;
  collections$: Observable<EmployeeStatus[]>;
  pageLength$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  pageSizeOptions = [5, 10, 15, 30, 50, 100];

  searchQuery$: Observable<string>;
  isLoading$: Observable<boolean>;
  isLoaded$: Observable<boolean>;

  constructor(
    private store$: Store<fromEmployeeStatus.State>,
    private service: EmployeeStatusService
  ) {}

  ngOnInit() {
    this.collections$ = this.store$.select(
      EmployeeStatusSelectors.getEmployeeStatusData
    );
    this.pageLength$ = this.store$.select(
      EmployeeStatusSelectors.getEmployeeStatusPageLength
    );
    this.pageSize$ = this.store$.select(
      EmployeeStatusSelectors.getEmployeeStatusPageSize
    );
    this.pageIndex$ = this.store$.select(
      EmployeeStatusSelectors.getEmployeeStatusPageIndex
    );
    this.searchQuery$ = this.store$.select(
      EmployeeStatusSelectors.getEmployeeStatusSearchQuery
    );

    this.isLoading$ = this.store$.select(
      EmployeeStatusSelectors.getEmployeeStatusIsLoading
    );

    this.isLoaded$ = this.store$.select(
      EmployeeStatusSelectors.getEmployeeStatusIsLoaded
    );

    this.dataSource = new EmployeeStatusTableDataSource(this.collections$);
    this.store$.dispatch(new EmployeeStatusActions.LoadEmployeeStatus());
  }

  pageEvent(ev: PageEvent) {
    this.store$.dispatch(
      new EmployeeStatusActions.PageEventEmployeeStatus(
        ev.pageSize,
        ev.pageIndex
      )
    );
    this.store$.dispatch(new EmployeeStatusActions.LoadEmployeeStatus());
  }

  sortEvent(ev: Sort) {
    this.store$.dispatch(
      new EmployeeStatusActions.SortEventEmployeeStatus(ev.active, ev.direction)
    );
    this.store$.dispatch(new EmployeeStatusActions.LoadEmployeeStatus());
  }

  search(ev) {
    this.store$.dispatch(new EmployeeStatusActions.SearchEmployeeStatus(ev));
  }

  create() {
    this.store$.dispatch(new EmployeeStatusActions.SelectEmployeeStatus(null));
    this.service.openForm();
  }

  update(id: number) {
    this.store$.dispatch(new EmployeeStatusActions.SelectEmployeeStatus(id));
    this.service.openForm();
  }
}
