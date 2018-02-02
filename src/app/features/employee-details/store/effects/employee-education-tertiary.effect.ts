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
import * as EducationTertiaryActions from "./../actions/employee-education-tertiary.action";
import * as fromEducationTertiaryReducers from "./../reducers/employee-education-tertiary.reducer";
import * as EducationTertiarySelectors from "./../selectors/employee-education-tertiary.selector";

import { EmployeeEducationTertiaryService } from "./../../services/employee-education-tertiary.service";
import { ToastrService } from "@core/services";

@Injectable()
export class EmployeeEducationTertiaryEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<fromEducationTertiaryReducers.State>,
    private routerStore$: Store<fromRootRouter.State>,
    private service: EmployeeEducationTertiaryService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadEducationTertiary$ = this.actions$
    .ofType(EducationTertiaryActions.LOAD_EDUCATIONTERTIARY)
    .pipe(
      withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
      switchMap(([action, router]) => {
        const { params } = router.state;
        const { employeeId } = params;

        return this.service.loadEducationTertiary(employeeId).pipe(
          mergeMap(result => {
            return [
              new EducationTertiaryActions.ClearEntitiesEducationTertiary(),
              new EducationTertiaryActions.LoadEducationTertiarySuccess(
                result.data
              )
            ];
          }),

          catchError(error =>
            of(new EducationTertiaryActions.LoadEducationTertiaryFail(error))
          )
        );
      })
    );

  @Effect({ dispatch: false })
  loadEducationTertiaryFailed$ = this.actions$
    .ofType<EducationTertiaryActions.LoadEducationTertiaryFail>(
      EducationTertiaryActions.LOAD_EDUCATIONTERTIARY_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  createEducationTertiary$ = this.actions$
    .ofType<EducationTertiaryActions.CreateEducationTertiary>(
      EducationTertiaryActions.CREATE_EDUCATIONTERTIARY
    )
    .pipe(
      withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
      switchMap(([action, router]) => {
        const { params } = router.state;
        const { employeeId } = params;
        const data = action.payload;
        return this.service
          .saveEducationTertiary(data, employeeId)
          .pipe(
            map(
              result =>
                new EducationTertiaryActions.CreateEducationTertiarySuccess(
                  result.createdData
                )
            ),
            catchError(error =>
              of(new EducationTertiaryActions.LoadEducationTertiaryFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  createEducationTertiarySuccess$ = this.actions$
    .ofType<EducationTertiaryActions.CreateEducationTertiarySuccess>(
      EducationTertiaryActions.CREATE_EDUCATIONTERTIARY_SUCCESS
    )
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  createEducationTertiaryFail$ = this.actions$
    .ofType<EducationTertiaryActions.CreateEducationTertiaryFail>(
      EducationTertiaryActions.CREATE_EDUCATIONTERTIARY_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );

  @Effect()
  updateEducationTertiary$ = this.actions$
    .ofType<EducationTertiaryActions.UpdateEducationTertiary>(
      EducationTertiaryActions.UPDATE_EDUCATIONTERTIARY
    )
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return this.service
          .updateEducationTertiary(data)
          .pipe(
            map(
              result =>
                new EducationTertiaryActions.UpdateEducationTertiarySuccess(
                  result.updatedData
                )
            ),
            catchError(error =>
              of(
                new EducationTertiaryActions.UpdateEducationTertiaryFail(error)
              )
            )
          );
      })
    );

  @Effect({ dispatch: false })
  updateEducationTertiarySuccess$ = this.actions$
    .ofType(EducationTertiaryActions.UPDATE_EDUCATIONTERTIARY_SUCCESS)
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  updateEducationTertiaryFail$ = this.actions$
    .ofType<EducationTertiaryActions.UpdateEducationTertiaryFail>(
      EducationTertiaryActions.UPDATE_EDUCATIONTERTIARY_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );
}
