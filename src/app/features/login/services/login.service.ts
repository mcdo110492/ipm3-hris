import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Store } from "@ngrx/store";
import * as fromRouter from "@app/store/reducers";
import * as RouterActions from "@app/store/actions";

import { Login, LoginResponse } from "./../models/login.model";

import { environment } from "@env/environment";

@Injectable()
export class LoginService {
  private restEndPoint: string = environment.restEndPoint;

  constructor(
    private http: HttpClient,
    private store$: Store<fromRouter.State>
  ) {}

  authenticate(credentials: Login) {
    return this.http.post<LoginResponse>(
      `${this.restEndPoint}/authenticate`,
      credentials
    );
  }

  redirectTo(role: number) {
    if (role == 1) {
      this.store$.dispatch(new RouterActions.Go({ path: ["/projects"] }));
    } else if (role == 2) {
      this.store$.dispatch(new RouterActions.Go({ path: ["/employee/list"] }));
    }
  }
}
