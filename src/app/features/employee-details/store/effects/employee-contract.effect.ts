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
import * as ContractActions from "./../actions/employee-contract.action";
import * as fromContractReducers from "./../reducers/employee-contract.reducer";
import * as ContractSelectors from "./../selectors/employee-contract.selector";

import { EmployeeContractService } from "./../../services/employee-contract.service";
import { ToastrService } from "@core/services";

@Injectable()
export class EmployeeContractEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<fromContractReducers.State>,
    private routerStore$: Store<fromRootRouter.State>,
    private service: EmployeeContractService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadContract$ = this.actions$.ofType(ContractActions.LOAD_CONTRACT).pipe(
    withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
    switchMap(([action, router]) => {
      const { params } = router.state;
      const { employeeId } = params;

      return this.service.loadContract(employeeId).pipe(
        mergeMap(result => {
          return [
            new ContractActions.ClearEntitiesContract(),
            new ContractActions.LoadContractSuccess(result.data)
          ];
        }),

        catchError(error => of(new ContractActions.LoadContractFail(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  loadContractFailed$ = this.actions$
    .ofType<ContractActions.LoadContractFail>(
      ContractActions.LOAD_CONTRACT_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  createContract$ = this.actions$
    .ofType<ContractActions.CreateContract>(ContractActions.CREATE_CONTRACT)
    .pipe(
      withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
      switchMap(([action, router]) => {
        const { params } = router.state;
        const { employeeId } = params;
        const data = action.payload;
        return this.service
          .saveContract(data, employeeId)
          .pipe(
            map(
              result =>
                new ContractActions.CreateContractSuccess(result.createdData)
            ),
            catchError(error => of(new ContractActions.LoadContractFail(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  createContractSuccess$ = this.actions$
    .ofType<ContractActions.CreateContractSuccess>(
      ContractActions.CREATE_CONTRACT_SUCCESS
    )
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  createContractFail$ = this.actions$
    .ofType<ContractActions.CreateContractFail>(
      ContractActions.CREATE_CONTRACT_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );

  @Effect()
  updateContract$ = this.actions$
    .ofType<ContractActions.UpdateContract>(ContractActions.UPDATE_CONTRACT)
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        return this.service
          .updateContract(data)
          .pipe(
            map(
              result =>
                new ContractActions.UpdateContractSuccess(result.updatedData)
            ),
            catchError(error =>
              of(new ContractActions.UpdateContractFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  updateContractSuccess$ = this.actions$
    .ofType(ContractActions.UPDATE_CONTRACT_SUCCESS)
    .pipe(
      tap(() => {
        this.service.closeForm();
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  updateContractFail$ = this.actions$
    .ofType<ContractActions.UpdateContractFail>(
      ContractActions.UPDATE_CONTRACT_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(err => {
        this.toast.errorHandler(err);
      })
    );
}
