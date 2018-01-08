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

import * as SalaryTypeActions from "./../actions/salary-type.action";
import * as fromSalaryTypeReducers from "./../reducers/salary-type.reducer";
import * as fromSalaryTypeSelectors from "./../selectors/salary-type.selector";

import { SalaryTypeService } from "./../../services";
import { ToastrService } from "@core/services";

@Injectable()
export class SalaryTypeEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromSalaryTypeReducers.State>,
    private service: SalaryTypeService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadSalaryType$ = this.actions$
    .ofType(SalaryTypeActions.LOAD_SALARYTYPE)
    .pipe(
      withLatestFrom(
        this.store$.select(fromSalaryTypeSelectors.getSalaryTypePageSize),
        this.store$.select(fromSalaryTypeSelectors.getSalaryTypePageIndex),
        this.store$.select(fromSalaryTypeSelectors.getSalaryTypeSortField),
        this.store$.select(fromSalaryTypeSelectors.getSalaryTypeSortDirection),
        this.store$.select(fromSalaryTypeSelectors.getSalaryTypeSearchQuery)
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
            .getSalaryType(
              pageIndex,
              pageSize,
              sortField,
              sortDirection,
              searchQuery
            )
            .pipe(
              mergeMap(result => {
                return [
                  new SalaryTypeActions.ClearEntitiesSalaryType(),
                  new SalaryTypeActions.LoadSalaryTypeSuccess({
                    data: result.data,
                    count: result.count
                  })
                ];
              }),
              catchError(error =>
                of(new SalaryTypeActions.LoadSalaryTypeFail(error))
              )
            );
        }
      )
    );

  @Effect()
  searchSalaryType$ = this.actions$
    .ofType(SalaryTypeActions.SEARCH_SALARYTYPE)
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => {
        return of(new SalaryTypeActions.LoadSalaryType());
      })
    );

  @Effect({ dispatch: false })
  loadSalaryTypeFailed$ = this.actions$
    .ofType<SalaryTypeActions.LoadSalaryTypeFail>(
      SalaryTypeActions.LOAD_SALARYTYPE_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  createSalaryType$ = this.actions$
    .ofType<SalaryTypeActions.CreateSalaryType>(
      SalaryTypeActions.CREATE_SALARYTYPE
    )
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return this.service.createSalaryType(data).pipe(
          mergeMap(() => {
            return [
              new SalaryTypeActions.LoadSalaryType(),
              new SalaryTypeActions.CreateSalaryTypeSuccess()
            ];
          }),
          catchError(error =>
            of(new SalaryTypeActions.LoadSalaryTypeFail(error))
          )
        );
      })
    );

  @Effect({ dispatch: false })
  createSalaryTypeSuccess$ = this.actions$
    .ofType(SalaryTypeActions.CREATE_SALARYTYPE_SUCCESS)
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  createSalaryTypeFail$ = this.actions$
    .ofType<SalaryTypeActions.CreateSalaryTypeFail>(
      SalaryTypeActions.CREATE_SALARYTYPE_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  updateSalaryType$ = this.actions$
    .ofType<SalaryTypeActions.UpdateSalaryType>(
      SalaryTypeActions.UPDATE_SALARYTYPE
    )
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return this.service
          .updateSalaryType(data)
          .pipe(
            map(
              result =>
                new SalaryTypeActions.UpdateSalaryTypeSuccess(
                  result.updatedData
                )
            ),
            catchError(error =>
              of(new SalaryTypeActions.UpdateSalaryTypeFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  updateSalaryTypeSuccess$ = this.actions$
    .ofType(SalaryTypeActions.UPDATE_SALARYTYPE_SUCCESS)
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  updateSalaryTypeFail$ = this.actions$
    .ofType<SalaryTypeActions.UpdateSalaryTypeFail>(
      SalaryTypeActions.UPDATE_SALARYTYPE_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );
}
