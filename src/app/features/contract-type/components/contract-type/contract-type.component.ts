import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { PageEvent, Sort } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as ContractTypeActions from "./../../store/actions";
import * as fromContractType from "./../../store/reducers/contract-type.reducer";
import * as ContractTypeSelectors from "./../../store/selectors/contract-type.selector";

import { ContractTypeTableDataSource } from "./contract-type.datasource";
import { ContractType } from "./../../models";

import { ContractTypeService } from "./../../services";

@Component({
  selector: "app-contract-type",
  templateUrl: "./contract-type.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractTypeComponent implements OnInit {
  displayedColumns = ["contractTypeCode", "contractTypeName", "actions"];
  dataSource: ContractTypeTableDataSource | null;
  collections$: Observable<ContractType[]>;
  pageLength$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  pageSizeOptions = [5, 10, 15, 30, 50, 100];

  searchQuery$: Observable<string>;
  isLoading$: Observable<boolean>;
  isLoaded$: Observable<boolean>;

  constructor(
    private store$: Store<fromContractType.State>,
    private service: ContractTypeService
  ) {}

  ngOnInit() {
    this.collections$ = this.store$.select(
      ContractTypeSelectors.getContractTypeData
    );
    this.pageLength$ = this.store$.select(
      ContractTypeSelectors.getContractTypePageLength
    );
    this.pageSize$ = this.store$.select(
      ContractTypeSelectors.getContractTypePageSize
    );
    this.pageIndex$ = this.store$.select(
      ContractTypeSelectors.getContractTypePageIndex
    );
    this.searchQuery$ = this.store$.select(
      ContractTypeSelectors.getContractTypeSearchQuery
    );

    this.isLoading$ = this.store$.select(
      ContractTypeSelectors.getContractTypeIsLoading
    );

    this.isLoaded$ = this.store$.select(
      ContractTypeSelectors.getContractTypeIsLoaded
    );

    this.dataSource = new ContractTypeTableDataSource(this.collections$);
    this.store$.dispatch(new ContractTypeActions.LoadContractType());
  }

  pageEvent(ev: PageEvent) {
    this.store$.dispatch(
      new ContractTypeActions.PageEventContractType(ev.pageSize, ev.pageIndex)
    );
    this.store$.dispatch(new ContractTypeActions.LoadContractType());
  }

  sortEvent(ev: Sort) {
    this.store$.dispatch(
      new ContractTypeActions.SortEventContractType(ev.active, ev.direction)
    );
    this.store$.dispatch(new ContractTypeActions.LoadContractType());
  }

  search(ev) {
    this.store$.dispatch(new ContractTypeActions.SearchContractType(ev));
  }

  create() {
    this.store$.dispatch(new ContractTypeActions.SelectContractType(null));
    this.service.openForm();
  }

  update(id: number) {
    this.store$.dispatch(new ContractTypeActions.SelectContractType(id));
    this.service.openForm();
  }
}
