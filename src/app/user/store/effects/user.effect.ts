import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { tap, switchMap } from "rxjs/operators";

import * as UserActions from "./../actions/user.action";
import * as RouterActions from "./../../../store/actions/router.action";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  loginFailed$ = this.actions$.ofType(UserActions.LOGOUT_USER).pipe(
    tap(() => localStorage.removeItem("presence")),
    switchMap(() => {
      return of(new RouterActions.Go({ path: ["/login"] }));
    })
  );
}
