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
export class MasterSalaryTypeEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromMasterDataReducers.State>,
    private service: MasterDataService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadAllSalaryType$ = this.actions$
    .ofType(MasterDataActions.LOAD_ALL_SALARYTYPE)
    .pipe(
      switchMap(() => {
        return this.service
          .getAllSalaryType()
          .pipe(
            map(
              result =>
                new MasterDataActions.LoadAllSalaryTypeSuccess(result.data)
            ),
            catchError(error =>
              of(new MasterDataActions.LoadAllSalaryTypeFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  loadSalaryTypeFailed$ = this.actions$
    .ofType<MasterDataActions.LoadAllSalaryTypeFail>(
      MasterDataActions.LOAD_ALL_SALARYTYPE_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );
}
