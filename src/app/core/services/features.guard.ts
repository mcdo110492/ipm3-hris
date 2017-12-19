import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import * as fromContent from "./../../content/store/reducers/content.reducer";
import * as ContentActions from "./../../content/store/actions/content.action";

@Injectable()
export class FeaturesGuard implements CanActivate, CanLoad {
  constructor(private store$: Store<fromContent.State>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.store$.dispatch(new ContentActions.IsLoginPage(false));
    return of(true);
  }

  canLoad(): Observable<boolean> {
    this.store$.dispatch(new ContentActions.IsLoginPage(false));
    return of(true);
  }
}
