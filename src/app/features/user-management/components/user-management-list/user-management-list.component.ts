import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { PageEvent, Sort, MatSlideToggleChange } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as UserManagementActions from "./../../store/actions/user-management.action";
import * as fromUserManagement from "./../../store/reducers/user-management.reducer";
import * as UserManagementSelectors from "./../../store/selectors/user-management.selector";

import { UserManagementTableDataSource } from "./user-management-list.datasource";
import { UserManagementModel } from "./../../models/user-management.model";

import { UserManagementService } from "./../../services/user-management.service";
import { environment } from "@env/environment";
import { ConfirmDialogService } from "@app/core";

@Component({
  selector: "app-user-management-list",
  templateUrl: "./user-management-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementListComponent implements OnInit {
  displayedColumns = [
    "profilePhoto",
    "username",
    "role",
    "profileName",
    "status",
    "actions"
  ];
  dataSource: UserManagementTableDataSource | null;
  collections$: Observable<UserManagementModel[]>;
  pageLength$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  pageSizeOptions = [5, 10, 15, 30, 50, 100];

  searchQuery$: Observable<string>;
  isLoading$: Observable<boolean>;
  isLoaded$: Observable<boolean>;

  imagePath = environment.imagePath;

  constructor(
    private store$: Store<fromUserManagement.State>,
    private service: UserManagementService,
    private confirm: ConfirmDialogService
  ) {}

  ngOnInit() {
    this.collections$ = this.store$.select(
      UserManagementSelectors.getUserManagementData
    );
    this.pageLength$ = this.store$.select(
      UserManagementSelectors.getUserManagementPageLength
    );
    this.pageSize$ = this.store$.select(
      UserManagementSelectors.getUserManagementPageSize
    );
    this.pageIndex$ = this.store$.select(
      UserManagementSelectors.getUserManagementPageIndex
    );
    this.searchQuery$ = this.store$.select(
      UserManagementSelectors.getUserManagementSearchQuery
    );

    this.isLoading$ = this.store$.select(
      UserManagementSelectors.getUserManagementIsLoading
    );
    this.isLoaded$ = this.store$.select(
      UserManagementSelectors.getUserManagementIsLoaded
    );

    this.dataSource = new UserManagementTableDataSource(this.collections$);
    this.store$.dispatch(new UserManagementActions.LoadUserManagement());
  }

  pageEvent(ev: PageEvent) {
    this.store$.dispatch(
      new UserManagementActions.PageEventUserManagement(
        ev.pageSize,
        ev.pageIndex
      )
    );
    this.store$.dispatch(new UserManagementActions.LoadUserManagement());
  }

  sortEvent(ev: Sort) {
    this.store$.dispatch(
      new UserManagementActions.SortEventUserManagement(ev.active, ev.direction)
    );
    this.store$.dispatch(new UserManagementActions.LoadUserManagement());
  }

  search(ev) {
    this.store$.dispatch(new UserManagementActions.SearchUserManagement(ev));
  }

  create() {
    this.service.openForm();
  }

  changeStatus(ev: MatSlideToggleChange, id: number) {
    const data = {
      userId: id,
      status: ev.checked ? 1 : 0
    };
    this.store$.dispatch(new UserManagementActions.ChangeStatus(data));
  }

  resetPassword(userId, username) {
    const confirm = this.confirm.openConfirm(
      "Password Reset",
      "Are you sure you want to reset the password of this account? The default password will be the current username."
    );
    confirm.afterClosed().subscribe(response => {
      if (response) {
        const data = {
          userId,
          username
        };
        this.store$.dispatch(new UserManagementActions.ResetPassword(data));
      }
    });
  }

  getRole(role: number) {
    return this.service.roleToString(role);
  }
}
