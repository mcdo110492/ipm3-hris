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
import * as PersonalActions from "./../actions/employee-personal.action";
import * as fromPersonal from "./../reducers/employee-personal.reducer";

import { EmployeePersonalService } from "./../../services/employee-personal.service";
import { ToastrService } from "@core/services";
import { EmployeePersonal } from "@app/features/employee-details/models";

@Injectable()
export class EmployeePersonalEffects {
  constructor(
    private actions$: Actions,
    private routerStore$: Store<fromRootRouter.State>,
    private service: EmployeePersonalService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadPersonalInfo$ = this.actions$
    .ofType(PersonalActions.LOAD_PERSONAL_INFO)
    .pipe(
      withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
      switchMap(([action, router]) => {
        const { rootParams } = router.state;
        return this.service
          .loadPersonal(rootParams.employeeId)
          .pipe(
            map(
              result => new PersonalActions.LoadPersonalInfoSuccess(result.data)
            ),
            catchError(error =>
              of(new PersonalActions.LoadPersonalInfoFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  loadPersonalInfoFail$ = this.actions$
    .ofType<PersonalActions.LoadPersonalInfoFail>(
      PersonalActions.LOAD_PERSONAL_INFO_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  savePersonalInfo$ = this.actions$
    .ofType<PersonalActions.SavePersonalInfo>(
      PersonalActions.SAVE_PERSONAL_INFO
    )
    .pipe(
      map(action => action.payload),
      switchMap((data: EmployeePersonal) => {
        return this.service
          .savePersonal(data)
          .pipe(
            map(result => new PersonalActions.SavePersonalSuccess(data)),
            catchError(error => of(new PersonalActions.SavePersonalFail(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  saverPersonalInfoSuccess$ = this.actions$
    .ofType(PersonalActions.SAVE_PERSONAL_INFO_SUCCESS)
    .pipe(
      tap(() => {
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  savePersonalInfoFail$ = this.actions$
    .ofType<PersonalActions.SavePersonalFail>(
      PersonalActions.SAVE_PERSONAL_INFO_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(payload => {
        this.toast.errorHandler(payload);
      })
    );
}
