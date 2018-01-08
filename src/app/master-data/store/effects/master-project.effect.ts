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
export class MasterProjectEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromMasterDataReducers.State>,
    private service: MasterDataService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadProjects$ = this.actions$
    .ofType(MasterDataActions.LOAD_ALL_PROJECTS)
    .pipe(
      switchMap(() => {
        return this.service.getAllProjects().pipe(
          map(result => {
            new MasterDataActions.LoadAllProjectsSuccess(result.data);
          }),
          catchError(error =>
            of(new MasterDataActions.LoadAllProjectsFail(error))
          )
        );
      })
    );

  @Effect({ dispatch: false })
  loadProjectsFailed$ = this.actions$
    .ofType<MasterDataActions.LoadAllProjectsFail>(
      MasterDataActions.LOAD_ALL_PROJECTS_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );
}
