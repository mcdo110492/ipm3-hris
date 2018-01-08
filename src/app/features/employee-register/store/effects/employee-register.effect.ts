import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Actions, Effect } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import {
  map,
  catchError,
  tap,
  switchMap,
  withLatestFrom,
  mergeMap
} from "rxjs/operators";

import * as EmployeeRegisterActions from "./../actions";
import * as fromEmployeeRegister from "./../reducers/employee-register.reducer";
import * as EmployeeRegisterSelectors from "./../selectors";
import * as fromProjectContent from "@content/store/reducers/project.reducer";
import * as ProjectContentSelector from "@content/store/selectors/project.selector";
import * as RouterActions from "@app/store/actions";

import { EmployeeRegister } from "./../../models";

import { EmployeeRegisterService } from "./../../services";

import { ToastrService, LoaderService } from "@core/services";

@Injectable()
export class EmployeeRegisterEffect {
  constructor(
    private action$: Actions,
    private store$: Store<fromEmployeeRegister.State>,
    private content$: Store<fromProjectContent.State>,
    private loader: LoaderService,
    private toast: ToastrService,
    private service: EmployeeRegisterService
  ) {}

  @Effect()
  submit$ = this.action$
    .ofType<EmployeeRegisterActions.Submit>(EmployeeRegisterActions.SUBMIT)
    .pipe(
      withLatestFrom(
        this.store$.select(EmployeeRegisterSelectors.getEmployeeRegisterData),
        this.content$.select(ProjectContentSelector.getSelectedProjectId)
      ),
      switchMap(([action, formData, project]) => {
        this.loader.openLoader();
        return this.service
          .submitForm(formData, project)
          .pipe(
            map(() => new EmployeeRegisterActions.SubmitSuccess()),
            catchError(err => of(new EmployeeRegisterActions.SubmitFail(err))),
            tap(() => this.loader.closeLoader())
          );
      })
    );

  @Effect()
  submitSuccess$ = this.action$
    .ofType(EmployeeRegisterActions.SUBMIT_SUCCESS)
    .pipe(
      tap(() => {
        this.toast.saveSuccess();
      }),
      mergeMap(() => {
        return [
          new EmployeeRegisterActions.Save(null),
          new RouterActions.Go({ path: ["/employee/list"] })
        ];
      })
    );

  @Effect({ dispatch: false })
  submitFail$ = this.action$
    .ofType<EmployeeRegisterActions.SubmitFail>(
      EmployeeRegisterActions.SUBMIT_FAIL
    )
    .pipe(
      map(action => action.payload),
      tap(payload => this.toast.errorHandler(payload))
    );
}
