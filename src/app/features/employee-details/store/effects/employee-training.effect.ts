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
import * as TrainingActions from "./../actions/employee-training.action";
import * as fromTrainingReducers from "./../reducers/employee-training.reducer";
import * as TrainingSelectors from "./../selectors/employee-training.selector";

import { EmployeeTrainingService } from "./../../services/employee-training.service";
import { ToastrService } from "@core/services";

@Injectable()
export class EmployeeTrainingEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<fromTrainingReducers.State>,
    private routerStore$: Store<fromRootRouter.State>,
    private service: EmployeeTrainingService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadTraining$ = this.actions$.ofType(TrainingActions.LOAD_TRAINING).pipe(
    withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
    switchMap(([action, router]) => {
      const { params } = router.state;
      const { employeeId } = params;

      return this.service.loadTraining(employeeId).pipe(
        mergeMap(result => {
          return [
            new TrainingActions.ClearEntitiesTraining(),
            new TrainingActions.LoadTrainingSuccess(result.data)
          ];
        }),

        catchError(error => of(new TrainingActions.LoadTrainingFail(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  loadTrainingFailed$ = this.actions$
    .ofType<TrainingActions.LoadTrainingFail>(
      TrainingActions.LOAD_TRAINING_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  createTraining$ = this.actions$
    .ofType<TrainingActions.CreateTraining>(TrainingActions.CREATE_TRAINING)
    .pipe(
      withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
      switchMap(([action, router]) => {
        const { params } = router.state;
        const { employeeId } = params;
        const data = action.payload;
        return this.service
          .saveTraining(data, employeeId)
          .pipe(
            map(
              result =>
                new TrainingActions.CreateTrainingSuccess(result.createdData)
            ),
            catchError(error => of(new TrainingActions.LoadTrainingFail(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  createTrainingSuccess$ = this.actions$
    .ofType<TrainingActions.CreateTrainingSuccess>(
      TrainingActions.CREATE_TRAINING_SUCCESS
    )
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  createTrainingFail$ = this.actions$
    .ofType<TrainingActions.CreateTrainingFail>(
      TrainingActions.CREATE_TRAINING_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );

  @Effect()
  updateTraining$ = this.actions$
    .ofType<TrainingActions.UpdateTraining>(TrainingActions.UPDATE_TRAINING)
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return this.service
          .updateTraining(data)
          .pipe(
            map(
              result =>
                new TrainingActions.UpdateTrainingSuccess(result.updatedData)
            ),
            catchError(error =>
              of(new TrainingActions.UpdateTrainingFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  updateTrainingSuccess$ = this.actions$
    .ofType(TrainingActions.UPDATE_TRAINING_SUCCESS)
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  updateTrainingFail$ = this.actions$
    .ofType<TrainingActions.UpdateTrainingFail>(
      TrainingActions.UPDATE_TRAINING_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );
}
