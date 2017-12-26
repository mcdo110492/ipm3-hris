import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { map, switchMap, catchError, tap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as ProjectActions from "./../actions/project.action";
import * as fromProject from "./../reducers/project.reducer";

import { ProjectSelectionService } from "@content/services";

import { ToastrService } from "@core/services/toastr.service";

@Injectable()
export class ProjectAllEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromProject.State>,
    private service: ProjectSelectionService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadAllProjects$ = this.actions$
    .ofType<ProjectActions.LoadAllProject>(ProjectActions.LOAD_ALL_PROJECT)
    .pipe(
      switchMap(() => {
        return this.service
          .getAllProjects()
          .pipe(
            map(
              result => new ProjectActions.LoadAllProjectSuccess(result.data)
            ),
            catchError(error =>
              of(new ProjectActions.LoadAllProjectFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  loadAllProjectFail$ = this.actions$
    .ofType<ProjectActions.LoadAllProjectFail>(
      ProjectActions.LOAD_ALL_PROJECT_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => this.toast.errorHandler(err))
    );
}
