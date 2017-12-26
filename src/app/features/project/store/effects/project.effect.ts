import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import {
  map,
  switchMap,
  catchError,
  tap,
  withLatestFrom,
  debounceTime,
  distinctUntilChanged,
  mergeMap
} from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as projectActions from "./../actions/project.action";
import * as fromProjectReducers from "./../reducers/project.reducer";
import * as fromProjectSelectors from "./../selectors/project.selector";

import { ProjectService } from "./../../services";

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromProjectReducers.State>,
    private service: ProjectService
  ) {}

  @Effect()
  loadProject$ = this.actions$.ofType(projectActions.LOAD_PROJECT).pipe(
    withLatestFrom(
      this.store$.select(fromProjectSelectors.getProjectPageSize),
      this.store$.select(fromProjectSelectors.getProjectPageIndex),
      this.store$.select(fromProjectSelectors.getProjectSortField),
      this.store$.select(fromProjectSelectors.getProjectSortDirection),
      this.store$.select(fromProjectSelectors.getProjectSearchQuery)
    ),
    switchMap(
      ([
        action,
        pageSize,
        pageIndex,
        sortField,
        sortDirection,
        searchQuery
      ]) => {
        return this.service
          .getProject(
            pageIndex,
            pageSize,
            sortField,
            sortDirection,
            searchQuery
          )
          .pipe(
            map(
              result =>
                new projectActions.LoadProjectSuccess({
                  data: result.data,
                  count: result.count
                })
            ),
            catchError(error => of(new projectActions.LoadProjectFail(error)))
          );
      }
    )
  );

  @Effect()
  searchProject$ = this.actions$.ofType(projectActions.SEARCH_PROJECT).pipe(
    withLatestFrom(
      this.store$.select(fromProjectSelectors.getProjectPageSize),
      this.store$.select(fromProjectSelectors.getProjectPageIndex),
      this.store$.select(fromProjectSelectors.getProjectSortField),
      this.store$.select(fromProjectSelectors.getProjectSortDirection),
      this.store$.select(fromProjectSelectors.getProjectSearchQuery)
    ),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(
      ([
        action,
        pageSize,
        pageIndex,
        sortField,
        sortDirection,
        searchQuery
      ]) => {
        return this.service
          .getProject(
            pageIndex,
            pageSize,
            sortField,
            sortDirection,
            searchQuery
          )
          .pipe(
            map(
              result =>
                new projectActions.LoadProjectSuccess({
                  data: result.data,
                  count: result.count
                })
            ),
            catchError(error => of(new projectActions.LoadProjectFail(error)))
          );
      }
    )
  );

  @Effect({ dispatch: false })
  loadProjectFailed$ = this.actions$
    .ofType(projectActions.LOAD_PROJECT_FAIL)
    .pipe(tap(() => {}));

  @Effect()
  createProject$ = this.actions$.ofType(projectActions.CREATE_PROJECT).pipe(
    map((action: projectActions.CreateProject) => action.payload),
    switchMap(data => {
      return this.service.createProject(data).pipe(
        mergeMap(() => {
          return [
            new projectActions.LoadProject(),
            new projectActions.CreateProjectSuccess()
          ];
        }),
        catchError(error => of(new projectActions.CreateProjectFail(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  createProjectSuccess$ = this.actions$
    .ofType(projectActions.CREATE_PROJECT_SUCCESS)
    .pipe(tap(() => {}));

  @Effect({ dispatch: false })
  createProjectFail$ = this.actions$
    .ofType(projectActions.CREATE_PROJECT_FAIL)
    .pipe(tap(() => {}));

  @Effect()
  updateProject$ = this.actions$.ofType(projectActions.UPDATE_PROJECT).pipe(
    map((action: projectActions.UpdateProject) => action.payload),
    switchMap(data => {
      return this.service
        .updateProject(data)
        .pipe(
          map(result => new projectActions.UpdateProjectSuccess(data)),
          catchError(error => of(new projectActions.UpdateProjectFail(error)))
        );
    })
  );

  @Effect({ dispatch: false })
  updateProjectSuccess$ = this.actions$
    .ofType(projectActions.UPDATE_PROJECT_SUCCESS)
    .pipe(tap(() => {}));

  @Effect({ dispatch: false })
  updateProjectFail$ = this.actions$
    .ofType(projectActions.UPDATE_PROJECT_FAIL)
    .pipe(tap(() => {}));
}
