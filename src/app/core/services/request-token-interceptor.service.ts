import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable } from "rxjs/Observable";

@Injectable()
export class RequestTokenInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const presence = JSON.parse(localStorage.presence || null);
    const authHeader = presence ? presence.token : null;

    const authRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${authHeader}` }
    });
    return next.handle(authRequest);
  }
}
