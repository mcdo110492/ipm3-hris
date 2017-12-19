import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import * as fromContent from "./../../content/store/reducers/content.reducer";
import * as ContentActions from "./../../content/store/actions/content.action";
import * as fromRouter from "./../../store/reducers";
import * as RouterActions from "./../../store/actions";

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private store$: Store<fromContent.State>,
    private routerStore$: Store<fromRouter.State>
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const presence = localStorage.presence || null;
    if (presence !== null) {
      return of(false);
    }
    this.store$.dispatch(new ContentActions.IsLoginPage(true));
    return of(true);
  }
}
