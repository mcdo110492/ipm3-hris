import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

@Injectable()
export class EmployeeDetailsService {
  currentRouteTab(data: any): Observable<number> {
    const label = data.label || null;

    if (label === "personal") {
      return of(0);
    } else if (label === "employment") {
      return of(1);
    } else if (label === "contact") {
      return of(2);
    } else if (label === "government") {
      return of(3);
    } else if (label === "health") {
      return of(4);
    } else if (label === "license") {
      return of(5);
    } else if (label === "educational") {
      return of(6);
    } else if (label === "training") {
      return of(7);
    } else if (label === "club") {
      return of(8);
    } else if (label === "account") {
      return of(9);
    }
  }
}
