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

import * as ProjectActions from "./../actions/project.action";
import * as fromProjectReducers from "./../reducers/project.reducer";
import * as fromProjectSelectors from "./../selectors/project.selector";

import * as fromContent from "@content/store/reducers/project.reducer";
import * as ContentActions from "@content/store/actions/project.action";

import { ProjectService } from "./../../services";

import { ToastrService } from "@core/services";

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromProjectReducers.State>,
    private service: ProjectService,
    private toast: ToastrService,
    private contentStore$: Store<fromContent.State>
  ) {}

  @Effect()
  loadProject$ = this.actions$.ofType(ProjectActions.LOAD_PROJECT).pipe(
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
            mergeMap(result => {
              return [
                new ProjectActions.ClearEntitiesProject(),
                new ProjectActions.LoadProjectSuccess({
                  data: result.data,
                  count: result.count
                })
              ];
            }),
            catchError(error => of(new ProjectActions.LoadProjectFail(error)))
          );
      }
    )
  );

  @Effect()
  searchProject$ = this.actions$.ofType(ProjectActions.SEARCH_PROJECT).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(() => {
      return of(new ProjectActions.LoadProject());
    })
  );

  @Effect({ dispatch: false })
  loadProjectFailed$ = this.actions$
    .ofType(ProjectActions.LOAD_PROJECT_FAIL)
    .pipe(tap(() => {}));

  @Effect()
  createProject$ = this.actions$.ofType(ProjectActions.CREATE_PROJECT).pipe(
    map((action: ProjectActions.CreateProject) => action.payload),
    switchMap(data => {
      return this.service.createProject(data).pipe(
        map(result => result.createdData),
        mergeMap(newData => {
          return [
            new ProjectActions.LoadProject(),
            new ProjectActions.CreateProjectSuccess(newData)
          ];
        }),
        catchError(error => of(new ProjectActions.LoadProjectFail(error)))
      );
    })
  );

  @Effect()
  createProjectSuccess$ = this.actions$
    .ofType<ProjectActions.CreateProjectSuccess>(
      ProjectActions.CREATE_PROJECT_SUCCESS
    )
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return of(new ContentActions.AddProject(data));
      }),
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  createProjectFail$ = this.actions$
    .ofType<ProjectActions.CreateProjectFail>(
      ProjectActions.CREATE_PROJECT_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.service.closeForm();
        this.toast.errorHandler(err);
      })
    );

  @Effect()
  updateProject$ = this.actions$.ofType(ProjectActions.UPDATE_PROJECT).pipe(
    map((action: ProjectActions.UpdateProject) => action.payload),
    switchMap(data => {
      return this.service
        .updateProject(data)
        .pipe(
          map(
            result =>
              new ProjectActions.UpdateProjectSuccess(result.createdData)
          ),
          catchError(error => of(new ProjectActions.UpdateProjectFail(error)))
        );
    })
  );

  @Effect()
  updateProjectSuccess$ = this.actions$
    .ofType<ProjectActions.UpdateProjectSuccess>(
      ProjectActions.UPDATE_PROJECT_SUCCESS
    )
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return of(new ContentActions.UpdateProject(data));
      }),
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  updateProjectFail$ = this.actions$
    .ofType<ProjectActions.UpdateProjectFail>(
      ProjectActions.UPDATE_PROJECT_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.service.closeForm();
        this.toast.errorHandler(err);
      })
    );
}
