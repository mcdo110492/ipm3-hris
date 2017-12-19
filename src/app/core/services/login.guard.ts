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

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private store$: Store<fromContent.State>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.store$.dispatch(new ContentActions.IsLoginPage(true));
    return of(true);
  }
}
