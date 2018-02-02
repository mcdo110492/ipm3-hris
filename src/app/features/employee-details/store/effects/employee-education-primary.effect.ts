import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import {
  map,
  switchMap,
  tap,
  catchError,
  withLatestFrom
} from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as fromRootRouter from "@app/store/reducers";
import * as EducationPrimaryActions from "./../actions/employee-education-primary.action";
import * as fromEducationPrimary from "./../reducers/employee-education-primary.reducer";

import { EmployeeEducationPrimaryService } from "./../../services/employee-education-primary.service";
import { ToastrService } from "@core/services";
import { EmployeeEducationPrimary } from "@app/features/employee-details/models";

@Injectable()
export class EmployeeEducationPrimaryEffects {
  constructor(
    private actions$: Actions,
    private routerStore$: Store<fromRootRouter.State>,
    private service: EmployeeEducationPrimaryService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadEducationPrimaryInfo$ = this.actions$
    .ofType(EducationPrimaryActions.LOAD_EDUCATIONPRIMARY_INFO)
    .pipe(
      withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
      switchMap(([action, router]) => {
        const { params } = router.state;
        return this.service
          .loadPrimary(params.employeeId)
          .pipe(
            map(
              result =>
                new EducationPrimaryActions.LoadEducationPrimaryInfoSuccess(
                  result.data
                )
            ),
            catchError(error =>
              of(
                new EducationPrimaryActions.LoadEducationPrimaryInfoFail(error)
              )
            )
          );
      })
    );

  @Effect({ dispatch: false })
  loadEducationPrimaryInfoFail$ = this.actions$
    .ofType<EducationPrimaryActions.LoadEducationPrimaryInfoFail>(
      EducationPrimaryActions.LOAD_EDUCATIONPRIMARY_INFO_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  saveEducationPrimaryInfo$ = this.actions$
    .ofType<EducationPrimaryActions.SaveEducationPrimaryInfo>(
      EducationPrimaryActions.SAVE_EDUCATIONPRIMARY_INFO
    )
    .pipe(
      map(action => action.payload),
      switchMap((data: EmployeeEducationPrimary) => {
        return this.service
          .savePrimary(data)
          .pipe(
            map(
              result =>
                new EducationPrimaryActions.SaveEducationPrimarySuccess()
            ),
            catchError(error =>
              of(new EducationPrimaryActions.SaveEducationPrimaryFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  saverEducationPrimaryInfoSuccess$ = this.actions$
    .ofType(EducationPrimaryActions.SAVE_EDUCATIONPRIMARY_INFO_SUCCESS)
    .pipe(
      tap(() => {
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  saveEducationPrimaryInfoFail$ = this.actions$
    .ofType<EducationPrimaryActions.SaveEducationPrimaryFail>(
      EducationPrimaryActions.SAVE_EDUCATIONPRIMARY_INFO_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(payload => {
        this.toast.errorHandler(payload);
      })
    );
}
