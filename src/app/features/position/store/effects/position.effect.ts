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

import * as PositionActions from "./../actions/position.action";
import * as fromPositionReducers from "./../reducers/position.reducer";
import * as fromPositionSelectors from "./../selectors/position.selector";

import { PositionService } from "./../../services";
import { ToastrService } from "@core/services";

@Injectable()
export class PositionEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromPositionReducers.State>,
    private service: PositionService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadPosition$ = this.actions$.ofType(PositionActions.LOAD_POSITION).pipe(
    withLatestFrom(
      this.store$.select(fromPositionSelectors.getPositionPageSize),
      this.store$.select(fromPositionSelectors.getPositionPageIndex),
      this.store$.select(fromPositionSelectors.getPositionSortField),
      this.store$.select(fromPositionSelectors.getPositionSortDirection),
      this.store$.select(fromPositionSelectors.getPositionSearchQuery),
      this.store$.select(fromPositionSelectors.getPositionIsLoaded)
    ),
    switchMap(
      ([
        action,
        pageSize,
        pageIndex,
        sortField,
        sortDirection,
        searchQuery,
        isLoaded
      ]) => {
        if (isLoaded) {
          return of();
        }

        return this.service
          .getPosition(
            pageIndex,
            pageSize,
            sortField,
            sortDirection,
            searchQuery
          )
          .pipe(
            mergeMap(result => {
              return [
                new PositionActions.ClearEntitiesPosition(),
                new PositionActions.LoadPositionSuccess({
                  data: result.data,
                  count: result.count
                })
              ];
            }),
            catchError(error => of(new PositionActions.LoadPositionFail(error)))
          );
      }
    )
  );

  @Effect()
  searchPosition$ = this.actions$.ofType(PositionActions.SEARCH_POSITION).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(() => {
      return of(new PositionActions.LoadPosition());
    })
  );

  @Effect({ dispatch: false })
  loadPositionFailed$ = this.actions$
    .ofType<PositionActions.LoadPositionFail>(
      PositionActions.LOAD_POSITION_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  createPosition$ = this.actions$
    .ofType<PositionActions.CreatePosition>(PositionActions.CREATE_POSITION)
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return this.service.createPosition(data).pipe(
          mergeMap(() => {
            return [
              new PositionActions.LoadPosition(),
              new PositionActions.CreatePositionSuccess()
            ];
          }),
          catchError(error => of(new PositionActions.LoadPositionFail(error)))
        );
      })
    );

  @Effect({ dispatch: false })
  createPositionSuccess$ = this.actions$
    .ofType<PositionActions.CreatePositionSuccess>(
      PositionActions.CREATE_POSITION_SUCCESS
    )
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  createPositionFail$ = this.actions$
    .ofType<PositionActions.CreatePositionFail>(
      PositionActions.CREATE_POSITION_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );

  @Effect()
  updatePosition$ = this.actions$
    .ofType<PositionActions.UpdatePosition>(PositionActions.UPDATE_POSITION)
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return this.service
          .updatePosition(data)
          .pipe(
            map(
              result =>
                new PositionActions.UpdatePositionSuccess(result.updatedData)
            ),
            catchError(error =>
              of(new PositionActions.UpdatePositionFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  updatePositionSuccess$ = this.actions$
    .ofType(PositionActions.UPDATE_POSITION_SUCCESS)
    .pipe(
      tap(() => {
        this.toast.saveSuccess();
        this.service.closeForm();
      })
    );

  @Effect({ dispatch: false })
  updatePositionFail$ = this.actions$
    .ofType<PositionActions.UpdatePositionFail>(
      PositionActions.UPDATE_POSITION_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );
}
