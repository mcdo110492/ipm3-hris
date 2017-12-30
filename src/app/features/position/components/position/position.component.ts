import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { PageEvent, Sort } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as PositionActions from "./../../store/actions";
import * as fromPosition from "./../../store/reducers/position.reducer";
import * as PositionSelectors from "./../../store/selectors/position.selector";

import { PositionTableDataSource } from "./position.datasource";
import { Position } from "./../../models/position.model";

import { PositionService } from "./../../services/position.service";

@Component({
  selector: "app-position",
  templateUrl: "./position.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionComponent implements OnInit {
  displayedColumns = ["positionCode", "positionName", "actions"];
  dataSource: PositionTableDataSource | null;
  collections$: Observable<Position[]>;
  pageLength$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  pageSizeOptions = [5, 10, 15, 30, 50, 100];

  searchQuery$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(
    private store$: Store<fromPosition.State>,
    private service: PositionService
  ) {}

  ngOnInit() {
    this.collections$ = this.store$.select(PositionSelectors.getPositionData);
    this.pageLength$ = this.store$.select(
      PositionSelectors.getPositionPageLength
    );
    this.pageSize$ = this.store$.select(PositionSelectors.getPositionPageSize);
    this.pageIndex$ = this.store$.select(
      PositionSelectors.getPositionPageIndex
    );
    this.searchQuery$ = this.store$.select(
      PositionSelectors.getPositionSearchQuery
    );

    this.isLoading$ = this.store$.select(
      PositionSelectors.getPositionIsLoading
    );

    this.dataSource = new PositionTableDataSource(this.collections$);
    this.store$.dispatch(new PositionActions.LoadPosition());
  }

  pageEvent(ev: PageEvent) {
    this.store$.dispatch(
      new PositionActions.PageEventPosition(ev.pageSize, ev.pageIndex)
    );
    this.store$.dispatch(new PositionActions.LoadPosition());
  }

  sortEvent(ev: Sort) {
    this.store$.dispatch(
      new PositionActions.SortEventPosition(ev.active, ev.direction)
    );
    this.store$.dispatch(new PositionActions.LoadPosition());
  }

  search(ev) {
    this.store$.dispatch(new PositionActions.SearchPosition(ev));
  }

  create() {
    this.store$.dispatch(new PositionActions.SelectPosition(null));
    this.service.openForm();
  }

  update(id: number) {
    this.store$.dispatch(new PositionActions.SelectPosition(id));
    this.service.openForm();
  }
}
