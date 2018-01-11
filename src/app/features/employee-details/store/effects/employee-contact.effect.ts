import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import {
  map,
  switchMap,
  tap,
  catchError,
  withLatestFrom
} from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as fromRootRouter from "@app/store/reducers";
import * as ContactActions from "./../actions/employee-contact.action";
import * as fromContact from "./../reducers/employee-contact.reducer";

import { EmployeeContactService } from "./../../services/employee-contact.service";
import { ToastrService } from "@core/services";
import { EmployeeContact } from "@app/features/employee-details/models";

@Injectable()
export class EmployeeContactEffects {
  constructor(
    private actions$: Actions,
    private routerStore$: Store<fromRootRouter.State>,
    private service: EmployeeContactService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadContactInfo$ = this.actions$
    .ofType(ContactActions.LOAD_CONTACT_INFO)
    .pipe(
      withLatestFrom(this.routerStore$.select(fromRootRouter.getRouterState)),
      switchMap(([action, router]) => {
        const { rootParams } = router.state;
        return this.service
          .loadContact(rootParams.employeeId)
          .pipe(
            map(
              result => new ContactActions.LoadContactInfoSuccess(result.data)
            ),
            catchError(error =>
              of(new ContactActions.LoadContactInfoFail(error))
            )
          );
      })
    );

  @Effect({ dispatch: false })
  loadContactInfoFail$ = this.actions$
    .ofType<ContactActions.LoadContactInfoFail>(
      ContactActions.LOAD_CONTACT_INFO_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(error => {
        this.toast.errorHandler(error);
      })
    );

  @Effect()
  saveContactInfo$ = this.actions$
    .ofType<ContactActions.SaveContactInfo>(ContactActions.SAVE_CONTACT_INFO)
    .pipe(
      map(action => action.payload),
      switchMap((data: EmployeeContact) => {
        return this.service
          .saveContact(data)
          .pipe(
            map(result => new ContactActions.SaveContactSuccess(data)),
            catchError(error => of(new ContactActions.SaveContactFail(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  saverContactInfoSuccess$ = this.actions$
    .ofType(ContactActions.SAVE_CONTACT_INFO_SUCCESS)
    .pipe(
      tap(() => {
        this.toast.saveSuccess();
      })
    );

  @Effect({ dispatch: false })
  saveContactInfoFail$ = this.actions$
    .ofType<ContactActions.SaveContactFail>(
      ContactActions.SAVE_CONTACT_INFO_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(payload => {
        this.toast.errorHandler(payload);
      })
    );
}
