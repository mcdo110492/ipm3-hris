import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { PageEvent, Sort } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as EmploymentStatusActions from "./../../store/actions";
import * as fromEmploymentStatus from "./../../store/reducers/employment-status.reducer";
import * as PositionSelectors from "./../../store/selectors/employment-status.selector";

import { EmploymentStatusTableDataSource } from "./employment-status.datasource";
import { EmploymentStatus } from "./../../models/employment-status.model";

import { EmploymentStatusService } from "./../../services/employment-status.service";

@Component({
  selector: "app-employment-status",
  templateUrl: "./employment-status.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmploymentStatusComponent implements OnInit {
  displayedColumns = [
    "employmentStatusCode",
    "employmentStatusName",
    "actions"
  ];
  dataSource: EmploymentStatusTableDataSource | null;
  collections$: Observable<EmploymentStatus[]>;
  pageLength$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  pageSizeOptions = [5, 10, 15, 30, 50, 100];

  searchQuery$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(
    private store$: Store<fromEmploymentStatus.State>,
    private service: EmploymentStatusService
  ) {}

  ngOnInit() {
    this.collections$ = this.store$.select(
      PositionSelectors.getEmploymentStatusData
    );
    this.pageLength$ = this.store$.select(
      PositionSelectors.getEmploymentStatusPageLength
    );
    this.pageSize$ = this.store$.select(
      PositionSelectors.getEmploymentStatusPageSize
    );
    this.pageIndex$ = this.store$.select(
      PositionSelectors.getEmploymentStatusPageIndex
    );
    this.searchQuery$ = this.store$.select(
      PositionSelectors.getEmploymentStatusSearchQuery
    );

    this.isLoading$ = this.store$.select(
      PositionSelectors.getEmploymentStatusIsLoading
    );

    this.dataSource = new EmploymentStatusTableDataSource(this.collections$);
    this.store$.dispatch(new EmploymentStatusActions.LoadEmploymentStatus());
  }

  pageEvent(ev: PageEvent) {
    this.store$.dispatch(
      new EmploymentStatusActions.PageEventEmploymentStatus(
        ev.pageSize,
        ev.pageIndex
      )
    );
    this.store$.dispatch(new EmploymentStatusActions.LoadEmploymentStatus());
  }

  sortEvent(ev: Sort) {
    this.store$.dispatch(
      new EmploymentStatusActions.SortEventEmploymentStatus(
        ev.active,
        ev.direction
      )
    );
    this.store$.dispatch(new EmploymentStatusActions.LoadEmploymentStatus());
  }

  search(ev) {
    this.store$.dispatch(
      new EmploymentStatusActions.SearchEmploymentStatus(ev)
    );
  }

  create() {
    this.store$.dispatch(
      new EmploymentStatusActions.SelectEmploymentStatus(null)
    );
    this.service.openForm();
  }

  update(id: number) {
    this.store$.dispatch(
      new EmploymentStatusActions.SelectEmploymentStatus(id)
    );
    this.service.openForm();
  }
}
