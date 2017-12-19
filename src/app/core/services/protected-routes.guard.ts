import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { first } from "rxjs/operators";

import { TokenVerifierService } from "./token-verifier.service";

@Injectable()
export class ProtectedRoutesGuard
  implements CanActivate, CanActivateChild, CanLoad {
  constructor(private service: TokenVerifierService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.service.verifyToken().pipe(first());
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.service.verifyToken().pipe(first());
  }

  canLoad() {
    return this.service.verifyToken().pipe(first());
  }
}
