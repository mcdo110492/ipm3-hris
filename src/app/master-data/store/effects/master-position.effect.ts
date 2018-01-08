import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { map, switchMap, catchError, tap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as MasterDataActions from "./../actions/master-data.action";

import { MasterDataService } from "./../../services";
import { ToastrService } from "@core/services";

@Injectable()
export class MasterPositionEffects {
  constructor(
    private actions$: Actions,
    private service: MasterDataService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadAllPositions$ = this.actions$
    .ofType(MasterDataActions.LOAD_ALL_POSITIONS)
    .pipe(
      switchMap(() => {
        return this.service
          .getAllPositions()
          .pipe(
            map(
              result =>
                new MasterDataActions.LoadAllPositionsSuccess(result.data)
            ),
            catchError(error =>
              of(new MasterDataActions.LoadAllPositionsFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  loadPositionsFailed$ = this.actions$
    .ofType<MasterDataActions.LoadAllPositionsFail>(
      MasterDataActions.LOAD_ALL_POSITIONS_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );
}
