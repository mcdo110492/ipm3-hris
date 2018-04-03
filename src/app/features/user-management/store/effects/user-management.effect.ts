import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import {
  map,
  switchMap,
  catchError,
  tap,
  withLatestFrom,
  debounceTime,
  distinctUntilChanged,
  mergeMap,
  concatMap
} from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as UserManagementActions from "./../actions/user-management.action";
import * as fromUserManagementReducers from "./../reducers/user-management.reducer";
import * as fromUserManagementSelectors from "./../selectors/user-management.selector";

import * as fromProjectContent from "@content/store/reducers/project.reducer";
import * as ProjectContentSelector from "@content/store/selectors/project.selector";

import { UserManagementService } from "./../../services";
import { ToastrService } from "@core/services";

@Injectable()
export class UserManagementEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromUserManagementReducers.State>,
    private content$: Store<fromProjectContent.State>,
    private service: UserManagementService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadUserManagement$ = this.actions$
    .ofType(UserManagementActions.LOAD_USERMANAGEMENT)
    .pipe(
      withLatestFrom(
        this.store$.select(
          fromUserManagementSelectors.getUserManagementPageSize
        ),
        this.store$.select(
          fromUserManagementSelectors.getUserManagementPageIndex
        ),
        this.store$.select(
          fromUserManagementSelectors.getUserManagementSortField
        ),
        this.store$.select(
          fromUserManagementSelectors.getUserManagementSortDirection
        ),
        this.store$.select(
          fromUserManagementSelectors.getUserManagementSearchQuery
        ),
        this.store$.select(
          fromUserManagementSelectors.getUserManagementIsLoaded
        ),
        this.content$.select(ProjectContentSelector.getSelectedProjectId)
      ),
      switchMap(
        ([
          action,
          pageSize,
          pageIndex,
          sortField,
          sortDirection,
          searchQuery,
          isLoaded,
          projectId
        ]) => {
          return this.service
            .getUserManagement(
              pageIndex,
              pageSize,
              sortField,
              sortDirection,
              searchQuery,
              projectId
            )
            .pipe(
              mergeMap(result => {
                return [
                  new UserManagementActions.ClearEntitiesUserManagement(),
                  new UserManagementActions.LoadUserManagementSuccess({
                    data: result.data,
                    count: result.count
                  })
                ];
              }),
              catchError(error =>
                of(new UserManagementActions.LoadUserManagementFail(error))
              )
            );
        }
      )
    );

  @Effect()
  searchUserManagement$ = this.actions$
    .ofType(UserManagementActions.SEARCH_USERMANAGEMENT)
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => {
        return of(new UserManagementActions.LoadUserManagement());
      })
    );

  @Effect({ dispatch: false })
  loadUserManagementFailed$ = this.actions$
    .ofType(UserManagementActions.LOAD_USERMANAGEMENT_FAIL)
    .pipe(tap(() => {}));

  @Effect()
  createUserManagement$ = this.actions$
    .ofType<UserManagementActions.CreateUserManagement>(
      UserManagementActions.CREATE_USERMANAGEMENT
    )
    .pipe(
      withLatestFrom(
        this.content$.select(ProjectContentSelector.getSelectedProjectId)
      ),
      map(([action, projectId]) => {
        const { username, role, profileName, userId } = action.payload;
        return {
          username,
          role,
          profileName,
          projectId,
          userId
        };
      }),
      switchMap(data => {
        return this.service.addUser(data).pipe(
          mergeMap(newData => {
            return [
              new UserManagementActions.LoadUserManagement(),
              new UserManagementActions.CreateUserManagementSuccess(newData)
            ];
          }),
          catchError(error =>
            of(new UserManagementActions.LoadUserManagementFail(error))
          )
        );
      })
    );

  @Effect({ dispatch: false })
  createUserManagementSuccess$ = this.actions$
    .ofType<UserManagementActions.CreateUserManagementSuccess>(
      UserManagementActions.CREATE_USERMANAGEMENT_SUCCESS
    )
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  createUserManagementFail$ = this.actions$
    .ofType<UserManagementActions.CreateUserManagementFail>(
      UserManagementActions.CREATE_USERMANAGEMENT_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );

  @Effect()
  resetPassword$ = this.actions$
    .ofType<UserManagementActions.ResetPassword>(
      UserManagementActions.RESET_PASSWORD
    )
    .pipe(
      map(action => action.payload),
      concatMap(data => {
        return this.service
          .resetPassword(data)
          .pipe(
            map(resp => new UserManagementActions.RequestSuccess(resp)),
            catchError(err => of(new UserManagementActions.RequestFail(err)))
          );
      })
    );

  @Effect()
  changeStatus$ = this.actions$
    .ofType<UserManagementActions.ChangeStatus>(
      UserManagementActions.CHANGE_STATUS
    )
    .pipe(
      map(action => action.payload),
      concatMap(data => {
        return this.service
          .changeStatus(data)
          .pipe(
            map(resp => new UserManagementActions.RequestSuccess(resp)),
            catchError(err => of(new UserManagementActions.RequestFail(err)))
          );
      })
    );

  @Effect({ dispatch: false })
  responseSuccess$ = this.actions$
    .ofType<UserManagementActions.RequestSuccess>(
      UserManagementActions.REQUEST_SUCCESS
    )
    .pipe(
      tap(() => {
        this.toast.custom("success", "Success", "");
      })
    );

  @Effect({ dispatch: false })
  requestFail$ = this.actions$
    .ofType<UserManagementActions.RequestFail>(
      UserManagementActions.REQUEST_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );
}
