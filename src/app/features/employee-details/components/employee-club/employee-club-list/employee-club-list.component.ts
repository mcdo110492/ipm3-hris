import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as ClubActions from "./../../../store/actions/employee-club.action";
import * as fromClub from "./../../../store/reducers/employee-club.reducer";
import * as ClubSelectors from "./../../../store/selectors/employee-club.selector";

import { EmployeeClub } from "./../../../models/employee-club.model";
import { EmployeeClubTableDataSource } from "./employee-club-list.datasource";

import { EmployeeClubService } from "./../../../services/employee-club.service";

@Component({
  selector: "app-employee-club-list",
  templateUrl: "./employee-club-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeClubListComponent implements OnInit {
  displayedColumns = ["clubName", "clubPosition", "membershipDate", "actions"];
  dataSource: EmployeeClubTableDataSource | null;
  collections$: Observable<EmployeeClub[]>;
  isLoading$: Observable<boolean>;
  isLoaded$: Observable<boolean>;
  constructor(
    private store$: Store<fromClub.State>,
    private service: EmployeeClubService
  ) {}

  ngOnInit() {
    this.collections$ = this.store$.select(ClubSelectors.getClubData);
    this.isLoading$ = this.store$.select(ClubSelectors.getClubIsLoading);
    this.isLoaded$ = this.store$.select(ClubSelectors.getClubIsLoaded);

    this.dataSource = new EmployeeClubTableDataSource(this.collections$);

    this.store$.dispatch(new ClubActions.LoadClub());
  }

  create() {
    this.store$.dispatch(new ClubActions.SelectClub(null));
    this.service.openForm();
  }

  update(id: number) {
    this.store$.dispatch(new ClubActions.SelectClub(id));
    this.service.openForm();
  }
}
