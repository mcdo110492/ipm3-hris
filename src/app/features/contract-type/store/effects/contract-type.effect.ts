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

import * as ContractTypeActions from "./../actions/contract-type.action";
import * as fromContractTypeReducers from "./../reducers/contract-type.reducer";
import * as fromContractTypeSelectors from "./../selectors/contract-type.selector";

import { ContractTypeService } from "./../../services";
import { ToastrService } from "@core/services";

@Injectable()
export class ContractTypeEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromContractTypeReducers.State>,
    private service: ContractTypeService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadContractType$ = this.actions$
    .ofType(ContractTypeActions.LOAD_CONTRACTTYPE)
    .pipe(
      withLatestFrom(
        this.store$.select(fromContractTypeSelectors.getContractTypePageSize),
        this.store$.select(fromContractTypeSelectors.getContractTypePageIndex),
        this.store$.select(fromContractTypeSelectors.getContractTypeSortField),
        this.store$.select(
          fromContractTypeSelectors.getContractTypeSortDirection
        ),
        this.store$.select(fromContractTypeSelectors.getContractTypeSearchQuery)
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
            .getContractType(
              pageIndex,
              pageSize,
              sortField,
              sortDirection,
              searchQuery
            )
            .pipe(
              mergeMap(result => {
                return [
                  new ContractTypeActions.ClearEntitiesContractType(),
                  new ContractTypeActions.LoadContractTypeSuccess({
                    data: result.data,
                    count: result.count
                  })
                ];
              }),
              catchError(error =>
                of(new ContractTypeActions.LoadContractTypeFail(error))
              )
            );
        }
      )
    );

  @Effect()
  searchContractType$ = this.actions$
    .ofType(ContractTypeActions.SEARCH_CONTRACTTYPE)
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => {
        return of(new ContractTypeActions.LoadContractType());
      })
    );

  @Effect({ dispatch: false })
  loadContractTypeFailed$ = this.actions$
    .ofType<ContractTypeActions.LoadContractTypeFail>(
      ContractTypeActions.LOAD_CONTRACTTYPE_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  createContractType$ = this.actions$
    .ofType<ContractTypeActions.CreateContractType>(
      ContractTypeActions.CREATE_CONTRACTTYPE
    )
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return this.service.createContractType(data).pipe(
          mergeMap(() => {
            return [
              new ContractTypeActions.LoadContractType(),
              new ContractTypeActions.CreateContractTypeSuccess()
            ];
          }),
          catchError(error =>
            of(new ContractTypeActions.LoadContractTypeFail(error))
          )
        );
      })
    );

  @Effect({ dispatch: false })
  createContractTypeSuccess$ = this.actions$
    .ofType(ContractTypeActions.CREATE_CONTRACTTYPE_SUCCESS)
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  createContractTypeFail$ = this.actions$
    .ofType<ContractTypeActions.CreateContractTypeFail>(
      ContractTypeActions.CREATE_CONTRACTTYPE_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  updateContractType$ = this.actions$
    .ofType<ContractTypeActions.UpdateContractType>(
      ContractTypeActions.UPDATE_CONTRACTTYPE
    )
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return this.service
          .updateContractType(data)
          .pipe(
            map(
              result =>
                new ContractTypeActions.UpdateContractTypeSuccess(
                  result.updatedData
                )
            ),
            catchError(error =>
              of(new ContractTypeActions.UpdateContractTypeFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  updateContractTypeSuccess$ = this.actions$
    .ofType(ContractTypeActions.UPDATE_CONTRACTTYPE_SUCCESS)
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  updateContractTypeFail$ = this.actions$
    .ofType<ContractTypeActions.UpdateContractTypeFail>(
      ContractTypeActions.UPDATE_CONTRACTTYPE_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );
}
