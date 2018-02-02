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
import * as EducationSecondaryActions from "./../actions/employee-education-secondary.action";
import * as fromEducationSecondary from "./../reducers/employee-education-secondary.reducer";

import { EmployeeEducationSecondaryService } from "./../../services/employee-education-secondary.service";
import { ToastrService } from "@core/services";
import { EmployeeEducationSecondary } from "@app/features/employee-details/models";

@Injectable()
export class EmployeeEducationSecondaryEffects {
  constructor(
    private actions$: Actions,
    private routerStore$: Store<fromRootRouter.State>,
    private service: EmployeeEducationSecondaryService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadEducationSecondaryInfo$ = this.actions$
    .ofType(EducationSecondaryActions.LOAD_EDUCATIONSECONDARY_INFO)
    .pipe(
      withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
      switchMap(([action, router]) => {
        const { params } = router.state;
        return this.service
          .loadSecondary(params.employeeId)
          .pipe(
            map(
              result =>
                new EducationSecondaryActions.LoadEducationSecondaryInfoSuccess(
                  result.data
                )
            ),
            catchError(error =>
              of(
                new EducationSecondaryActions.LoadEducationSecondaryInfoFail(
                  error
                )
              )
            )
          );
      })
    );

  @Effect({ dispatch: false })
  loadEducationSecondaryInfoFail$ = this.actions$
    .ofType<EducationSecondaryActions.LoadEducationSecondaryInfoFail>(
      EducationSecondaryActions.LOAD_EDUCATIONSECONDARY_INFO_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  saveEducationSecondaryInfo$ = this.actions$
    .ofType<EducationSecondaryActions.SaveEducationSecondaryInfo>(
      EducationSecondaryActions.SAVE_EDUCATIONSECONDARY_INFO
    )
    .pipe(
      map(action => action.payload),
      switchMap((data: EmployeeEducationSecondary) => {
        return this.service
          .saveSecondary(data)
          .pipe(
            map(
              result =>
                new EducationSecondaryActions.SaveEducationSecondarySuccess()
            ),
            catchError(error =>
              of(
                new EducationSecondaryActions.SaveEducationSecondaryFail(error)
              )
            )
          );
      })
    );

  @Effect({ dispatch: false })
  saverEducationSecondaryInfoSuccess$ = this.actions$
    .ofType(EducationSecondaryActions.SAVE_EDUCATIONSECONDARY_INFO_SUCCESS)
    .pipe(
      tap(() => {
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  saveEducationSecondaryInfoFail$ = this.actions$
    .ofType<EducationSecondaryActions.SaveEducationSecondaryFail>(
      EducationSecondaryActions.SAVE_EDUCATIONSECONDARY_INFO_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(payload => {
        this.toast.errorHandler(payload);
      })
    );
}
