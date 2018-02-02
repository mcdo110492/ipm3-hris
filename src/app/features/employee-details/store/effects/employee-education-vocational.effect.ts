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
import * as EducationVocationalActions from "./../actions/employee-education-vocational.action";
import * as fromEducationVocationalReducers from "./../reducers/employee-education-vocational.reducer";
import * as EducationVocationalSelectors from "./../selectors/employee-education-vocational.selector";

import { EmployeeEducationVocationalService } from "./../../services/employee-education-vocational.service";
import { ToastrService } from "@core/services";

@Injectable()
export class EmployeeEducationVocationalEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<fromEducationVocationalReducers.State>,
    private routerStore$: Store<fromRootRouter.State>,
    private service: EmployeeEducationVocationalService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadEducationVocational$ = this.actions$
    .ofType(EducationVocationalActions.LOAD_EDUCATIONVOCATIONAL)
    .pipe(
      withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
      switchMap(([action, router]) => {
        const { params } = router.state;
        const { employeeId } = params;

        return this.service.loadEducationVocational(employeeId).pipe(
          mergeMap(result => {
            return [
              new EducationVocationalActions.ClearEntitiesEducationVocational(),
              new EducationVocationalActions.LoadEducationVocationalSuccess(
                result.data
              )
            ];
          }),

          catchError(error =>
            of(
              new EducationVocationalActions.LoadEducationVocationalFail(error)
            )
          )
        );
      })
    );

  @Effect({ dispatch: false })
  loadEducationVocationalFailed$ = this.actions$
    .ofType<EducationVocationalActions.LoadEducationVocationalFail>(
      EducationVocationalActions.LOAD_EDUCATIONVOCATIONAL_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  createEducationVocational$ = this.actions$
    .ofType<EducationVocationalActions.CreateEducationVocational>(
      EducationVocationalActions.CREATE_EDUCATIONVOCATIONAL
    )
    .pipe(
      withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
      switchMap(([action, router]) => {
        const { params } = router.state;
        const { employeeId } = params;
        const data = action.payload;
        return this.service
          .saveEducationVocational(data, employeeId)
          .pipe(
            map(
              result =>
                new EducationVocationalActions.CreateEducationVocationalSuccess(
                  result.createdData
                )
            ),
            catchError(error =>
              of(
                new EducationVocationalActions.LoadEducationVocationalFail(
                  error
                )
              )
            )
          );
      })
    );

  @Effect({ dispatch: false })
  createEducationVocationalSuccess$ = this.actions$
    .ofType<EducationVocationalActions.CreateEducationVocationalSuccess>(
      EducationVocationalActions.CREATE_EDUCATIONVOCATIONAL_SUCCESS
    )
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  createEducationVocationalFail$ = this.actions$
    .ofType<EducationVocationalActions.CreateEducationVocationalFail>(
      EducationVocationalActions.CREATE_EDUCATIONVOCATIONAL_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );

  @Effect()
  updateEducationVocational$ = this.actions$
    .ofType<EducationVocationalActions.UpdateEducationVocational>(
      EducationVocationalActions.UPDATE_EDUCATIONVOCATIONAL
    )
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return this.service
          .updateEducationVocational(data)
          .pipe(
            map(
              result =>
                new EducationVocationalActions.UpdateEducationVocationalSuccess(
                  result.updatedData
                )
            ),
            catchError(error =>
              of(
                new EducationVocationalActions.UpdateEducationVocationalFail(
                  error
                )
              )
            )
          );
      })
    );

  @Effect({ dispatch: false })
  updateEducationVocationalSuccess$ = this.actions$
    .ofType(EducationVocationalActions.UPDATE_EDUCATIONVOCATIONAL_SUCCESS)
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  updateEducationVocationalFail$ = this.actions$
    .ofType<EducationVocationalActions.UpdateEducationVocationalFail>(
      EducationVocationalActions.UPDATE_EDUCATIONVOCATIONAL_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );
}
