import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { map, switchMap, catchError, tap, mergeMap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as LoginActions from "./../actions/login.action";
import * as fromLoginReducers from "./../reducers/login.reducer";
import * as UserActions from "@user/store/actions/user.action";

import { LoginService } from "./../../services";

import { ToastrService } from "@core/services/toastr.service";

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromLoginReducers.State>,
    private service: LoginService,
    private toast: ToastrService
  ) {}

  @Effect()
  loginCredentials$ = this.actions$
    .ofType<LoginActions.LoginActions>(LoginActions.LOGIN_CREDENTIALS)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.service
          .authenticate(payload)
          .pipe(
            map(result => new LoginActions.LoginSuccess(result)),
            catchError(error => of(new LoginActions.LoginFail(error)))
          );
      })
    );

  @Effect()
  loginSuccess$ = this.actions$
    .ofType<LoginActions.LoginSuccess>(LoginActions.LOGIN_SUCCESS)
    .pipe(
      tap(() => this.toast.loginSuccess()),
      map(action => action.payload),
      switchMap(payload => {
        const { status } = payload;
        if (status == 200) {
          const user = {
            profileName: payload.profileName,
            profileImage: payload.profileImage,
            userRole: payload.role,
            token: payload.token,
            refreshToken: payload.refreshToken || null
          };
          const presence = JSON.stringify(user);
          localStorage.setItem("presence", presence);
          this.service.redirectTo(payload.role);
          return of(new UserActions.SetUser(user));
        } else if (status == 401) {
          this.toast.custom(
            "error",
            "Invalid Credentials",
            "Incorrect username or password"
          );
        } else if (status == 403) {
          this.toast.custom(
            "warning",
            "Account Locked",
            "This account has been locked. Please contact your administrator to activate this account."
          );
        }
        return of();
      })
    );

  @Effect({ dispatch: false })
  loginFailed$ = this.actions$
    .ofType<LoginActions.LoginFail>(LoginActions.LOGIN_FAIL)
    .pipe(
      map(action => action.payload),
      tap(err => this.toast.errorHandler(err))
    );
}
