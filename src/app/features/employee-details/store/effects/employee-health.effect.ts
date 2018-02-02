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
import * as HealthActions from "./../actions/employee-health.action";
import * as fromHealth from "./../reducers/employee-health.reducer";

import { EmployeeHealthService } from "./../../services/employee-health.service";
import { ToastrService } from "@core/services";
import { EmployeeHealth } from "@app/features/employee-details/models";

@Injectable()
export class EmployeeHealthEffects {
  constructor(
    private actions$: Actions,
    private routerStore$: Store<fromRootRouter.State>,
    private service: EmployeeHealthService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadHealthInfo$ = this.actions$.ofType(HealthActions.LOAD_HEALTH_INFO).pipe(
    withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
    switchMap(([action, router]) => {
      const { params } = router.state;
      return this.service
        .loadHealth(params.employeeId)
        .pipe(
          map(result => new HealthActions.LoadHealthInfoSuccess(result.data)),
          catchError(error => of(new HealthActions.LoadHealthInfoFail(error)))
        );
    })
  );

  @Effect({ dispatch: false })
  loadHealthInfoFail$ = this.actions$
    .ofType<HealthActions.LoadHealthInfoFail>(
      HealthActions.LOAD_HEALTH_INFO_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  saveHealthInfo$ = this.actions$
    .ofType<HealthActions.SaveHealthInfo>(HealthActions.SAVE_HEALTH_INFO)
    .pipe(
      map(action => action.payload),
      switchMap((data: EmployeeHealth) => {
        return this.service
          .saveHealth(data)
          .pipe(
            map(result => new HealthActions.SaveHealthSuccess(data)),
            catchError(error => of(new HealthActions.SaveHealthFail(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  saverHealthInfoSuccess$ = this.actions$
    .ofType(HealthActions.SAVE_HEALTH_INFO_SUCCESS)
    .pipe(
      tap(() => {
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  saveHealthInfoFail$ = this.actions$
    .ofType<HealthActions.SaveHealthFail>(HealthActions.SAVE_HEALTH_INFO_FAIL)
    .pipe(
      map(action => action.payload),
      tap(payload => {
        this.toast.errorHandler(payload);
      })
    );
}
