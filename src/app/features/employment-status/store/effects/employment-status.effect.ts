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

import * as EmploymentStatusActions from "./../actions/employment-status.action";
import * as fromEmploymentStatusReducers from "./../reducers/employment-status.reducer";
import * as fromEmploymentStatusSelectors from "./../selectors/employment-status.selector";

import { EmploymentStatusService } from "./../../services";
import { ToastrService } from "@core/services";

@Injectable()
export class EmploymentStatusEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromEmploymentStatusReducers.State>,
    private service: EmploymentStatusService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadEmploymentStatus$ = this.actions$
    .ofType(EmploymentStatusActions.LOAD_EMPLOYMENTSTATUS)
    .pipe(
      withLatestFrom(
        this.store$.select(
          fromEmploymentStatusSelectors.getEmploymentStatusPageSize
        ),
        this.store$.select(
          fromEmploymentStatusSelectors.getEmploymentStatusPageIndex
        ),
        this.store$.select(
          fromEmploymentStatusSelectors.getEmploymentStatusSortField
        ),
        this.store$.select(
          fromEmploymentStatusSelectors.getEmploymentStatusSortDirection
        ),
        this.store$.select(
          fromEmploymentStatusSelectors.getEmploymentStatusSearchQuery
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
            .getEmploymentStatus(
              pageIndex,
              pageSize,
              sortField,
              sortDirection,
              searchQuery
            )
            .pipe(
              mergeMap(result => {
                return [
                  new EmploymentStatusActions.ClearEntitiesEmploymentStatus(),
                  new EmploymentStatusActions.LoadEmploymentStatusSuccess({
                    data: result.data,
                    count: result.count
                  })
                ];
              }),
              catchError(error =>
                of(new EmploymentStatusActions.LoadEmploymentStatusFail(error))
              )
            );
        }
      )
    );

  @Effect()
  searchEmploymentStatus$ = this.actions$
    .ofType(EmploymentStatusActions.SEARCH_EMPLOYMENTSTATUS)
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => {
        return of(new EmploymentStatusActions.LoadEmploymentStatus());
      })
    );

  @Effect({ dispatch: false })
  loadEmploymentStatusFailed$ = this.actions$
    .ofType(EmploymentStatusActions.LOAD_EMPLOYMENTSTATUS_FAIL)
    .pipe(tap(() => {}));

  @Effect()
  createEmploymentStatus$ = this.actions$
    .ofType<EmploymentStatusActions.CreateEmploymentStatus>(
      EmploymentStatusActions.CREATE_EMPLOYMENTSTATUS
    )
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return this.service.createEmploymentStatus(data).pipe(
          mergeMap(() => {
            return [
              new EmploymentStatusActions.LoadEmploymentStatus(),
              new EmploymentStatusActions.CreateEmploymentStatusSuccess()
            ];
          }),
          catchError(error =>
            of(new EmploymentStatusActions.LoadEmploymentStatusFail(error))
          )
        );
      })
    );

  @Effect({ dispatch: false })
  createEmploymentStatusSuccess$ = this.actions$
    .ofType(EmploymentStatusActions.CREATE_EMPLOYMENTSTATUS_SUCCESS)
    .pipe(
      tap(() => {
        this.toast.saveSuccess();
        this.service.closeForm();
      })
    );

  @Effect({ dispatch: false })
  createEmploymentStatusFail$ = this.actions$
    .ofType<EmploymentStatusActions.CreateEmploymentStatusFail>(
      EmploymentStatusActions.CREATE_EMPLOYMENTSTATUS_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );

  @Effect()
  updateEmploymentStatus$ = this.actions$
    .ofType<EmploymentStatusActions.UpdateEmploymentStatus>(
      EmploymentStatusActions.UPDATE_EMPLOYMENTSTATUS
    )
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return this.service
          .updateEmploymentStatus(data)
          .pipe(
            map(
              result =>
                new EmploymentStatusActions.UpdateEmploymentStatusSuccess(
                  result.createdData
                )
            ),
            catchError(error =>
              of(new EmploymentStatusActions.UpdateEmploymentStatusFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  updateEmploymentStatusSuccess$ = this.actions$
    .ofType(EmploymentStatusActions.UPDATE_EMPLOYMENTSTATUS_SUCCESS)
    .pipe(
      tap(() => {
        this.toast.saveSuccess();
        this.service.closeForm();
      })
    );

  @Effect({ dispatch: false })
  updateEmploymentStatusFail$ = this.actions$
    .ofType<EmploymentStatusActions.UpdateEmploymentStatusFail>(
      EmploymentStatusActions.UPDATE_EMPLOYMENTSTATUS_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );
}
