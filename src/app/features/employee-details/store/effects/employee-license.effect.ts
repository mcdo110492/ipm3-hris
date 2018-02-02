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
import * as LicenseActions from "./../actions/employee-license.action";
import * as fromLicenseReducers from "./../reducers/employee-license.reducer";
import * as LicenseSelectors from "./../selectors/employee-license.selector";

import { EmployeeLicenseService } from "./../../services/employee-license.service";
import { ToastrService } from "@core/services";

@Injectable()
export class EmployeeLicenseEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<fromLicenseReducers.State>,
    private routerStore$: Store<fromRootRouter.State>,
    private service: EmployeeLicenseService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadLicense$ = this.actions$.ofType(LicenseActions.LOAD_LICENSE).pipe(
    withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
    switchMap(([action, router]) => {
      const { params } = router.state;
      const { employeeId } = params;

      return this.service.loadLicense(employeeId).pipe(
        mergeMap(result => {
          return [
            new LicenseActions.ClearEntitiesLicense(),
            new LicenseActions.LoadLicenseSuccess(result.data)
          ];
        }),

        catchError(error => of(new LicenseActions.LoadLicenseFail(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  loadLicenseFailed$ = this.actions$
    .ofType<LicenseActions.LoadLicenseFail>(LicenseActions.LOAD_LICENSE_FAIL)
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  createLicense$ = this.actions$
    .ofType<LicenseActions.CreateLicense>(LicenseActions.CREATE_LICENSE)
    .pipe(
      withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
      switchMap(([action, router]) => {
        const { params } = router.state;
        const { employeeId } = params;
        const data = action.payload;
        return this.service
          .saveLicense(data, employeeId)
          .pipe(
            map(
              result =>
                new LicenseActions.CreateLicenseSuccess(result.createdData)
            ),
            catchError(error => of(new LicenseActions.LoadLicenseFail(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  createLicenseSuccess$ = this.actions$
    .ofType<LicenseActions.CreateLicenseSuccess>(
      LicenseActions.CREATE_LICENSE_SUCCESS
    )
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  createLicenseFail$ = this.actions$
    .ofType<LicenseActions.CreateLicenseFail>(
      LicenseActions.CREATE_LICENSE_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );

  @Effect()
  updateLicense$ = this.actions$
    .ofType<LicenseActions.UpdateLicense>(LicenseActions.UPDATE_LICENSE)
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return this.service
          .updateLicense(data)
          .pipe(
            map(
              result =>
                new LicenseActions.UpdateLicenseSuccess(result.updatedData)
            ),
            catchError(error => of(new LicenseActions.UpdateLicenseFail(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  updateLicenseSuccess$ = this.actions$
    .ofType(LicenseActions.UPDATE_LICENSE_SUCCESS)
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  updateLicenseFail$ = this.actions$
    .ofType<LicenseActions.UpdateLicenseFail>(
      LicenseActions.UPDATE_LICENSE_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );
}
