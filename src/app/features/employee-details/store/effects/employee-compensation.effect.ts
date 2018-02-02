import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import {
  map,
  switchMap,
  catchError,
  tap,
  withLatestFrom,
  mergeMap
} from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as fromRootRouter from "@app/store/reducers";
import * as CompensationActions from "./../actions/employee-compensation.action";
import * as fromCompensationReducers from "./../reducers/employee-compensation.reducer";
import * as CompensationSelectors from "./../selectors/employee-compensation.selector";

import { EmployeeCompensationService } from "./../../services/employee-compensation.service";
import { ToastrService } from "@core/services";

@Injectable()
export class EmployeeCompensationEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<fromCompensationReducers.State>,
    private routerStore$: Store<fromRootRouter.State>,
    private service: EmployeeCompensationService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadCompensation$ = this.actions$
    .ofType(CompensationActions.LOAD_COMPENSATION)
    .pipe(
      withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
      switchMap(([action, router]) => {
        const { params } = router.state;
        const { employeeId } = params;

        return this.service.loadCompensation(employeeId).pipe(
          mergeMap(result => {
            return [
              new CompensationActions.ClearEntitiesCompensation(),
              new CompensationActions.LoadCompensationSuccess(result.data)
            ];
          }),

          catchError(error =>
            of(new CompensationActions.LoadCompensationFail(error))
          )
        );
      })
    );

  @Effect({ dispatch: false })
  loadCompensationFailed$ = this.actions$
    .ofType<CompensationActions.LoadCompensationFail>(
      CompensationActions.LOAD_COMPENSATION_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  createCompensation$ = this.actions$
    .ofType<CompensationActions.CreateCompensation>(
      CompensationActions.CREATE_COMPENSATION
    )
    .pipe(
      withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
      switchMap(([action, router]) => {
        const { params } = router.state;
        const { employeeId } = params;
        const data = action.payload;
        return this.service
          .saveCompensation(data, employeeId)
          .pipe(
            map(
              result =>
                new CompensationActions.CreateCompensationSuccess(
                  result.createdData
                )
            ),
            catchError(error =>
              of(new CompensationActions.LoadCompensationFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  createCompensationSuccess$ = this.actions$
    .ofType<CompensationActions.CreateCompensationSuccess>(
      CompensationActions.CREATE_COMPENSATION_SUCCESS
    )
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  createCompensationFail$ = this.actions$
    .ofType<CompensationActions.CreateCompensationFail>(
      CompensationActions.CREATE_COMPENSATION_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );

  @Effect()
  updateCompensation$ = this.actions$
    .ofType<CompensationActions.UpdateCompensation>(
      CompensationActions.UPDATE_COMPENSATION
    )
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return this.service
          .updateCompensation(data)
          .pipe(
            map(
              result =>
                new CompensationActions.UpdateCompensationSuccess(
                  result.updatedData
                )
            ),
            catchError(error =>
              of(new CompensationActions.UpdateCompensationFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  updateCompensationSuccess$ = this.actions$
    .ofType(CompensationActions.UPDATE_COMPENSATION_SUCCESS)
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  updateCompensationFail$ = this.actions$
    .ofType<CompensationActions.UpdateCompensationFail>(
      CompensationActions.UPDATE_COMPENSATION_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );
}
