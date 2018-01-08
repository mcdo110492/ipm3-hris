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

import * as EmployeeListActions from "./../actions/employee-list.action";
import * as fromEmployeeListReducers from "./../reducers/employee-list.reducer";
import * as fromEmployeeListSelectors from "./../selectors/employee-list.selector";
import * as fromProjectContent from "@content/store/reducers/project.reducer";
import * as ProjectContentSelector from "@content/store/selectors/project.selector";

import { EmployeeListService } from "./../../services";
import { ToastrService } from "@core/services";

@Injectable()
export class EmployeeListEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromEmployeeListReducers.State>,
    private content$: Store<fromProjectContent.State>,
    private service: EmployeeListService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadEmployeeList$ = this.actions$
    .ofType(EmployeeListActions.LOAD_EMPLOYEELIST)
    .pipe(
      withLatestFrom(
        this.store$.select(fromEmployeeListSelectors.getEmployeeListPageSize),
        this.store$.select(fromEmployeeListSelectors.getEmployeeListPageIndex),
        this.store$.select(fromEmployeeListSelectors.getEmployeeListSortField),
        this.store$.select(
          fromEmployeeListSelectors.getEmployeeListSortDirection
        ),
        this.store$.select(
          fromEmployeeListSelectors.getEmployeeListSearchQuery
        ),
        this.content$.select(ProjectContentSelector.getSelectedProjectId)
      ),
      switchMap(
        ([
          action,
          pageSize,
          pageIndex,
          sortField,
          sortDirection,
          searchQuery,
          projectId
        ]) => {
          return this.service
            .loadEmployeeList(
              pageIndex,
              pageSize,
              sortField,
              sortDirection,
              searchQuery,
              projectId
            )
            .pipe(
              mergeMap(result => {
                return [
                  new EmployeeListActions.ClearEntitiesEmployeeList(),
                  new EmployeeListActions.LoadEmployeeListSuccess({
                    data: result.data,
                    count: result.count
                  })
                ];
              }),
              catchError(error =>
                of(new EmployeeListActions.LoadEmployeeListFail(error))
              )
            );
        }
      )
    );

  @Effect()
  searchEmployeeList$ = this.actions$
    .ofType(EmployeeListActions.SEARCH_EMPLOYEELIST)
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => {
        return of(new EmployeeListActions.LoadEmployeeList());
      })
    );

  @Effect({ dispatch: false })
  loadEmployeeListFailed$ = this.actions$
    .ofType<EmployeeListActions.LoadEmployeeListFail>(
      EmployeeListActions.LOAD_EMPLOYEELIST_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );
}
