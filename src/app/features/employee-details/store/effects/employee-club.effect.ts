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
import * as ClubActions from "./../actions/employee-club.action";
import * as fromClubReducers from "./../reducers/employee-club.reducer";
import * as ClubSelectors from "./../selectors/employee-club.selector";

import { EmployeeClubService } from "./../../services/employee-club.service";
import { ToastrService } from "@core/services";

@Injectable()
export class EmployeeClubEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<fromClubReducers.State>,
    private routerStore$: Store<fromRootRouter.State>,
    private service: EmployeeClubService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadClub$ = this.actions$.ofType(ClubActions.LOAD_CLUB).pipe(
    withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
    switchMap(([action, router]) => {
      const { params } = router.state;
      const { employeeId } = params;

      return this.service.loadClub(employeeId).pipe(
        mergeMap(result => {
          return [
            new ClubActions.ClearEntitiesClub(),
            new ClubActions.LoadClubSuccess(result.data)
          ];
        }),
        catchError(error => of(new ClubActions.LoadClubFail(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  loadClubFailed$ = this.actions$
    .ofType<ClubActions.LoadClubFail>(ClubActions.LOAD_CLUB_FAIL)
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  createClub$ = this.actions$
    .ofType<ClubActions.CreateClub>(ClubActions.CREATE_CLUB)
    .pipe(
      withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
      switchMap(([action, router]) => {
        const { params } = router.state;
        const { employeeId } = params;
        const data = action.payload;
        return this.service
          .saveClub(data, employeeId)
          .pipe(
            map(
              result => new ClubActions.CreateClubSuccess(result.createdData)
            ),
            catchError(error => of(new ClubActions.LoadClubFail(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  createClubSuccess$ = this.actions$
    .ofType<ClubActions.CreateClubSuccess>(ClubActions.CREATE_CLUB_SUCCESS)
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  createClubFail$ = this.actions$
    .ofType<ClubActions.CreateClubFail>(ClubActions.CREATE_CLUB_FAIL)
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );

  @Effect()
  updateClub$ = this.actions$
    .ofType<ClubActions.UpdateClub>(ClubActions.UPDATE_CLUB)
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return this.service
          .updateClub(data)
          .pipe(
            map(
              result => new ClubActions.UpdateClubSuccess(result.updatedData)
            ),
            catchError(error => of(new ClubActions.UpdateClubFail(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  updateClubSuccess$ = this.actions$
    .ofType(ClubActions.UPDATE_CLUB_SUCCESS)
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  updateClubFail$ = this.actions$
    .ofType<ClubActions.UpdateClubFail>(ClubActions.UPDATE_CLUB_FAIL)
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );
}
