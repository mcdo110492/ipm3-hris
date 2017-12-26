import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { map, switchMap, catchError } from "rxjs/operators";
import * as fromUser from "@user/store/reducers/user.reducer";
import * as UserActions from "@user/store/actions/user.action";
import * as fromContent from "@content/store/reducers/content.reducer";
import * as ContentActions from "@content/store/actions/content.action";

import { environment } from "@env/environment";

@Injectable()
export class TokenVerifierService {
  private restEndPoint = environment.restEndPoint;
  constructor(
    private http: HttpClient,
    private userStore$: Store<fromUser.State>,
    private contentStore$: Store<fromContent.State>
  ) {}

  verifyToken(): Observable<boolean> {
    return this.http.get(`${this.restEndPoint}/routeAuthenticate`).pipe(
      switchMap(response => {
        this.contentStore$.dispatch(new ContentActions.IsLoginPage(false));
        return of(true);
      }),
      catchError(() => {
        this.userStore$.dispatch(new UserActions.LogoutUser());
        return of(false);
      })
    );
  }
}
