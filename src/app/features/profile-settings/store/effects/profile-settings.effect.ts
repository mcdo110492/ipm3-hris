import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { map, concatMap, switchMap, catchError, tap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as ProfileActions from "./../actions/profile-settings.action";
import * as UserActions from "@user/store/actions/user.action";

import { ProfileSettingsService } from "./../../services";
import { ToastrService } from "@app/core";

@Injectable()
export class ProfileSettingsEffect {
  constructor(
    private _actions$: Actions,
    private _service: ProfileSettingsService,
    private _toast: ToastrService
  ) {}

  @Effect()
  changePassword$ = this._actions$
    .ofType<ProfileActions.ChangePassword>(ProfileActions.CHANGE_PASSWORD)
    .pipe(
      map(action => action.payload),
      concatMap(data => {
        return this._service
          .changePassword(data)
          .pipe(
            map(response => new ProfileActions.ChangePasswordSuccess(response)),
            catchError(err => of(new ProfileActions.ChangePasswordFail(err)))
          );
      })
    );

  @Effect()
  changePasswordSuccess$ = this._actions$
    .ofType<ProfileActions.ChangePasswordSuccess>(
      ProfileActions.CHANGE_PASSWORD_SUCCESS
    )
    .pipe(
      map(action => action.payload),
      switchMap(data => {
        if (data.status == 200) {
          this._toast.custom(
            "success",
            "Success",
            "You' re password has been changed."
          );
          return of(new UserActions.LogoutUser());
        } else {
          this._toast.custom("error", "Failed", "Password is invalid");
        }

        return of();
      })
    );
}
