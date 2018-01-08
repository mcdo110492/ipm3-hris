import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { map, switchMap, catchError, tap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as MasterDataActions from "./../actions/master-data.action";
import * as fromMasterDataReducers from "./../reducers/master-data.reducer";

import { MasterDataService } from "./../../services";
import { ToastrService } from "@core/services";

@Injectable()
export class MasterEmployeeStatusEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromMasterDataReducers.State>,
    private service: MasterDataService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadAllEmployeeStatus$ = this.actions$
    .ofType(MasterDataActions.LOAD_ALL_EMPLOYEESTATUS)
    .pipe(
      switchMap(() => {
        return this.service
          .getAllEmployeeStatus()
          .pipe(
            map(
              result =>
                new MasterDataActions.LoadAllEmployeeStatusSuccess(result.data)
            ),
            catchError(error =>
              of(new MasterDataActions.LoadAllEmployeeStatusFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  loadEmployeeStatusFailed$ = this.actions$
    .ofType<MasterDataActions.LoadAllEmployeeStatusFail>(
      MasterDataActions.LOAD_ALL_EMPLOYEESTATUS_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );
}
