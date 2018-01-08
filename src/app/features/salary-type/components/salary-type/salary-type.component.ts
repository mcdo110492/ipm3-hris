import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { PageEvent, Sort } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as SalaryTypeActions from "./../../store/actions";
import * as fromSalaryType from "./../../store/reducers/salary-type.reducer";
import * as SalaryTypeSelectors from "./../../store/selectors/salary-type.selector";

import { SalaryTypeTableDataSource } from "./salary-type.datasource";
import { SalaryType } from "./../../models";

import { SalaryTypeService } from "./../../services";

@Component({
  selector: "app-salary-type",
  templateUrl: "./salary-type.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalaryTypeComponent implements OnInit {
  displayedColumns = ["salaryTypeCode", "salaryTypeName", "actions"];
  dataSource: SalaryTypeTableDataSource | null;
  collections$: Observable<SalaryType[]>;
  pageLength$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  pageSizeOptions = [5, 10, 15, 30, 50, 100];

  searchQuery$: Observable<string>;
  isLoading$: Observable<boolean>;
  isLoaded$: Observable<boolean>;

  constructor(
    private store$: Store<fromSalaryType.State>,
    private service: SalaryTypeService
  ) {}

  ngOnInit() {
    this.collections$ = this.store$.select(
      SalaryTypeSelectors.getSalaryTypeData
    );
    this.pageLength$ = this.store$.select(
      SalaryTypeSelectors.getSalaryTypePageLength
    );
    this.pageSize$ = this.store$.select(
      SalaryTypeSelectors.getSalaryTypePageSize
    );
    this.pageIndex$ = this.store$.select(
      SalaryTypeSelectors.getSalaryTypePageIndex
    );
    this.searchQuery$ = this.store$.select(
      SalaryTypeSelectors.getSalaryTypeSearchQuery
    );

    this.isLoading$ = this.store$.select(
      SalaryTypeSelectors.getSalaryTypeIsLoading
    );

    this.isLoaded$ = this.store$.select(
      SalaryTypeSelectors.getSalaryTypeIsLoaded
    );

    this.dataSource = new SalaryTypeTableDataSource(this.collections$);
    this.store$.dispatch(new SalaryTypeActions.LoadSalaryType());
  }

  pageEvent(ev: PageEvent) {
    this.store$.dispatch(
      new SalaryTypeActions.PageEventSalaryType(ev.pageSize, ev.pageIndex)
    );
    this.store$.dispatch(new SalaryTypeActions.LoadSalaryType());
  }

  sortEvent(ev: Sort) {
    this.store$.dispatch(
      new SalaryTypeActions.SortEventSalaryType(ev.active, ev.direction)
    );
    this.store$.dispatch(new SalaryTypeActions.LoadSalaryType());
  }

  search(ev) {
    this.store$.dispatch(new SalaryTypeActions.SearchSalaryType(ev));
  }

  create() {
    this.store$.dispatch(new SalaryTypeActions.SelectSalaryType(null));
    this.service.openForm();
  }

  update(id: number) {
    this.store$.dispatch(new SalaryTypeActions.SelectSalaryType(id));
    this.service.openForm();
  }
}
