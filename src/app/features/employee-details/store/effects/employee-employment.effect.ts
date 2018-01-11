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
import * as EmploymentActions from "./../actions/employee-employment.action";
import * as fromEmployment from "./../reducers/employee-employment.reducer";

import { EmployeeEmploymentService } from "./../../services/employee-employment.service";
import { ToastrService } from "@core/services";
import { EmployeeEmployment } from "@app/features/employee-details/models/employee-employment.model";

@Injectable()
export class EmployeeEmploymentEffects {
  constructor(
    private actions$: Actions,
    private routerStore$: Store<fromRootRouter.State>,
    private service: EmployeeEmploymentService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadEmploymentInfo$ = this.actions$
    .ofType(EmploymentActions.LOAD_EMPLOYMENT_INFO)
    .pipe(
      withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
      switchMap(([action, router]) => {
        const { rootParams } = router.state;
        return this.service
          .loadEmployment(rootParams.employeeId)
          .pipe(
            map(
              result =>
                new EmploymentActions.LoadEmploymentInfoSuccess(result.data)
            ),
            catchError(error =>
              of(new EmploymentActions.LoadEmploymentInfoFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  loadEmploymentInfoFail$ = this.actions$
    .ofType<EmploymentActions.LoadEmploymentInfoFail>(
      EmploymentActions.LOAD_EMPLOYMENT_INFO_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  saveEmploymentInfo$ = this.actions$
    .ofType<EmploymentActions.SaveEmploymentInfo>(
      EmploymentActions.SAVE_EMPLOYMENT_INFO
    )
    .pipe(
      map(action => action.payload),
      switchMap((data: EmployeeEmployment) => {
        return this.service
          .saveEmployment(data)
          .pipe(
            map(result => new EmploymentActions.SaveEmploymentSuccess(data)),
            catchError(error =>
              of(new EmploymentActions.SaveEmploymentFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  saverEmploymentInfoSuccess$ = this.actions$
    .ofType(EmploymentActions.SAVE_EMPLOYMENT_INFO_SUCCESS)
    .pipe(
      tap(() => {
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  saveEmploymentInfoFail$ = this.actions$
    .ofType<EmploymentActions.SaveEmploymentFail>(
      EmploymentActions.SAVE_EMPLOYMENT_INFO_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(payload => {
        this.toast.errorHandler(payload);
      })
    );
}
