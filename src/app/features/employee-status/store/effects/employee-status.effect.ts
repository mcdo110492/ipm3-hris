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
  mergeMap
} from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as EmployeeStatusActions from "./../actions/employee-status.action";
import * as fromEmployeeStatusReducers from "./../reducers/employee-status.reducer";
import * as fromEmployeeStatusSelectors from "./../selectors/employee-status.selector";

import { EmployeeStatusService } from "./../../services";
import { ToastrService } from "@core/services";

@Injectable()
export class EmployeeStatusEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromEmployeeStatusReducers.State>,
    private service: EmployeeStatusService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadEmployeeStatus$ = this.actions$
    .ofType(EmployeeStatusActions.LOAD_EMPLOYEESTATUS)
    .pipe(
      withLatestFrom(
        this.store$.select(
          fromEmployeeStatusSelectors.getEmployeeStatusPageSize
        ),
        this.store$.select(
          fromEmployeeStatusSelectors.getEmployeeStatusPageIndex
        ),
        this.store$.select(
          fromEmployeeStatusSelectors.getEmployeeStatusSortField
        ),
        this.store$.select(
          fromEmployeeStatusSelectors.getEmployeeStatusSortDirection
        ),
        this.store$.select(
          fromEmployeeStatusSelectors.getEmployeeStatusSearchQuery
        )
      ),
      switchMap(
        ([
          action,
          pageSize,
          pageIndex,
          sortField,
          sortDirection,
          searchQuery
        ]) => {
          return this.service
            .getEmployeeStatus(
              pageIndex,
              pageSize,
              sortField,
              sortDirection,
              searchQuery
            )
            .pipe(
              mergeMap(result => {
                return [
                  new EmployeeStatusActions.ClearEntitiesEmployeeStatus(),
                  new EmployeeStatusActions.LoadEmployeeStatusSuccess({
                    data: result.data,
                    count: result.count
                  })
                ];
              }),
              catchError(error =>
                of(new EmployeeStatusActions.LoadEmployeeStatusFail(error))
              )
            );
        }
      )
    );

  @Effect()
  searchEmployeeStatus$ = this.actions$
    .ofType(EmployeeStatusActions.SEARCH_EMPLOYEESTATUS)
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => {
        return of(new EmployeeStatusActions.LoadEmployeeStatus());
      })
    );

  @Effect({ dispatch: false })
  loadEmployeeStatusFailed$ = this.actions$
    .ofType(EmployeeStatusActions.LOAD_EMPLOYEESTATUS_FAIL)
    .pipe(tap(() => {}));

  @Effect()
  createEmployeeStatus$ = this.actions$
    .ofType<EmployeeStatusActions.CreateEmployeeStatus>(
      EmployeeStatusActions.CREATE_EMPLOYEESTATUS
    )
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return this.service.createEmployeeStatus(data).pipe(
          mergeMap(() => {
            return [
              new EmployeeStatusActions.LoadEmployeeStatus(),
              new EmployeeStatusActions.CreateEmployeeStatusSuccess()
            ];
          }),
          catchError(error =>
            of(new EmployeeStatusActions.LoadEmployeeStatusFail(error))
          )
        );
      })
    );

  @Effect({ dispatch: false })
  createEmployeeStatusSuccess$ = this.actions$
    .ofType(EmployeeStatusActions.CREATE_EMPLOYEESTATUS_SUCCESS)
    .pipe(
      tap(() => {
        this.toast.saveSuccess();
        this.service.closeForm();
      })
    );

  @Effect({ dispatch: false })
  createEmployeeStatusFail$ = this.actions$
    .ofType<EmployeeStatusActions.CreateEmployeeStatusFail>(
      EmployeeStatusActions.CREATE_EMPLOYEESTATUS_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );

  @Effect()
  updateEmployeeStatus$ = this.actions$
    .ofType<EmployeeStatusActions.UpdateEmployeeStatus>(
      EmployeeStatusActions.UPDATE_EMPLOYEESTATUS
    )
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return this.service
          .updateEmployeeStatus(data)
          .pipe(
            map(
              result =>
                new EmployeeStatusActions.UpdateEmployeeStatusSuccess(
                  result.createdData
                )
            ),
            catchError(error =>
              of(new EmployeeStatusActions.UpdateEmployeeStatusFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  updateEmployeeStatusSuccess$ = this.actions$
    .ofType(EmployeeStatusActions.UPDATE_EMPLOYEESTATUS_SUCCESS)
    .pipe(
      tap(() => {
        this.toast.saveSuccess();
        this.service.closeForm();
      })
    );

  @Effect({ dispatch: false })
  updateEmployeeStatusFail$ = this.actions$
    .ofType<EmployeeStatusActions.UpdateEmployeeStatusFail>(
      EmployeeStatusActions.UPDATE_EMPLOYEESTATUS_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );
}
