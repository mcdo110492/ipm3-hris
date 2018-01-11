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
import * as GovernmentActions from "./../actions/employee-government.action";
import * as fromGovernment from "./../reducers/employee-government.reducer";

import { EmployeeGovernmentService } from "./../../services/employee-government.service";
import { ToastrService } from "@core/services";
import { EmployeeGovernment } from "@app/features/employee-details/models";

@Injectable()
export class EmployeeGovernmentEffects {
  constructor(
    private actions$: Actions,
    private routerStore$: Store<fromRootRouter.State>,
    private service: EmployeeGovernmentService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadGovernmentInfo$ = this.actions$
    .ofType(GovernmentActions.LOAD_GOVERNMENT_INFO)
    .pipe(
      withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
      switchMap(([action, router]) => {
        const { rootParams } = router.state;
        return this.service
          .loadGovernment(rootParams.employeeId)
          .pipe(
            map(
              result =>
                new GovernmentActions.LoadGovernmentInfoSuccess(result.data)
            ),
            catchError(error =>
              of(new GovernmentActions.LoadGovernmentInfoFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  loadGovernmentInfoFail$ = this.actions$
    .ofType<GovernmentActions.LoadGovernmentInfoFail>(
      GovernmentActions.LOAD_GOVERNMENT_INFO_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  saveGovernmentInfo$ = this.actions$
    .ofType<GovernmentActions.SaveGovernmentInfo>(
      GovernmentActions.SAVE_GOVERNMENT_INFO
    )
    .pipe(
      map(action => action.payload),
      switchMap((data: EmployeeGovernment) => {
        return this.service
          .saveGovernment(data)
          .pipe(
            map(result => new GovernmentActions.SaveGovernmentSuccess(data)),
            catchError(error =>
              of(new GovernmentActions.SaveGovernmentFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  saverGovernmentInfoSuccess$ = this.actions$
    .ofType(GovernmentActions.SAVE_GOVERNMENT_INFO_SUCCESS)
    .pipe(
      tap(() => {
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  saveGovernmentInfoFail$ = this.actions$
    .ofType<GovernmentActions.SaveGovernmentFail>(
      GovernmentActions.SAVE_GOVERNMENT_INFO_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(payload => {
        this.toast.errorHandler(payload);
      })
    );
}
