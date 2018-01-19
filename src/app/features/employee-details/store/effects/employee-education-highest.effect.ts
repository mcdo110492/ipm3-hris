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
import * as EducationHighestActions from "./../actions/employee-education-highest.action";
import * as fromEducationHighestReducers from "./../reducers/employee-education-highest.reducer";
import * as EducationHighestSelectors from "./../selectors/employee-education-highest.selector";

import { EmployeeEducationHighestService } from "./../../services/employee-education-highest.service";
import { ToastrService } from "@core/services";

@Injectable()
export class EmployeeEducationHighestEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<fromEducationHighestReducers.State>,
    private routerStore$: Store<fromRootRouter.State>,
    private service: EmployeeEducationHighestService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadEducationHighest$ = this.actions$
    .ofType(EducationHighestActions.LOAD_EDUCATIONHIGHEST)
    .pipe(
      withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
      switchMap(([action, router]) => {
        const { params } = router.state;
        const { employeeId } = params;

        return this.service.loadEducationHighest(employeeId).pipe(
          mergeMap(result => {
            return [
              new EducationHighestActions.ClearEntitiesEducationHighest(),
              new EducationHighestActions.LoadEducationHighestSuccess(
                result.data
              )
            ];
          }),

          catchError(error =>
            of(new EducationHighestActions.LoadEducationHighestFail(error))
          )
        );
      })
    );

  @Effect({ dispatch: false })
  loadEducationHighestFailed$ = this.actions$
    .ofType<EducationHighestActions.LoadEducationHighestFail>(
      EducationHighestActions.LOAD_EDUCATIONHIGHEST_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  createEducationHighest$ = this.actions$
    .ofType<EducationHighestActions.CreateEducationHighest>(
      EducationHighestActions.CREATE_EDUCATIONHIGHEST
    )
    .pipe(
      withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
      switchMap(([action, router]) => {
        const { params } = router.state;
        const { employeeId } = params;
        const data = action.payload;
        return this.service
          .saveEducationHighest(data, employeeId)
          .pipe(
            map(
              result =>
                new EducationHighestActions.CreateEducationHighestSuccess(
                  result.createdData
                )
            ),
            catchError(error =>
              of(new EducationHighestActions.LoadEducationHighestFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  createEducationHighestSuccess$ = this.actions$
    .ofType<EducationHighestActions.CreateEducationHighestSuccess>(
      EducationHighestActions.CREATE_EDUCATIONHIGHEST_SUCCESS
    )
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  createEducationHighestFail$ = this.actions$
    .ofType<EducationHighestActions.CreateEducationHighestFail>(
      EducationHighestActions.CREATE_EDUCATIONHIGHEST_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );

  @Effect()
  updateEducationHighest$ = this.actions$
    .ofType<EducationHighestActions.UpdateEducationHighest>(
      EducationHighestActions.UPDATE_EDUCATIONHIGHEST
    )
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return this.service
          .updateEducationHighest(data)
          .pipe(
            map(
              result =>
                new EducationHighestActions.UpdateEducationHighestSuccess(
                  result.updatedData
                )
            ),
            catchError(error =>
              of(new EducationHighestActions.UpdateEducationHighestFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  updateEducationHighestSuccess$ = this.actions$
    .ofType(EducationHighestActions.UPDATE_EDUCATIONHIGHEST_SUCCESS)
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  updateEducationHighestFail$ = this.actions$
    .ofType<EducationHighestActions.UpdateEducationHighestFail>(
      EducationHighestActions.UPDATE_EDUCATIONHIGHEST_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );
}
