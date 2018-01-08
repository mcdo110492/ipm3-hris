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
export class MasterEmploymentStatusEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromMasterDataReducers.State>,
    private service: MasterDataService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadAllEmploymentStatus$ = this.actions$
    .ofType(MasterDataActions.LOAD_ALL_EMPLOYMENTSTATUS)
    .pipe(
      switchMap(() => {
        return this.service
          .getAllEmploymentStatus()
          .pipe(
            map(
              result =>
                new MasterDataActions.LoadAllEmploymentStatusSuccess(
                  result.data
                )
            ),
            catchError(error =>
              of(new MasterDataActions.LoadAllEmploymentStatusFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  loadEmploymentStatusFailed$ = this.actions$
    .ofType<MasterDataActions.LoadAllEmploymentStatusFail>(
      MasterDataActions.LOAD_ALL_EMPLOYMENTSTATUS_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );
}
