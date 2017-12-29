import { Directive, forwardRef, Input, OnDestroy } from "@angular/core";
import {
  NG_ASYNC_VALIDATORS,
  Validator,
  AbstractControl
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import {
  switchMap,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  first,
  catchError
} from "rxjs/operators";
import { of } from "rxjs/observable/of";

import { environment } from "@env/environment";

interface StatusResponse {
  status: number;
  message: string;
}

@Directive({
  selector:
    "[appUniqueValidator][formControlName],[appUniqueValidator][ngModel]",
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueValidatorDirective),
      multi: true
    }
  ]
})
export class UniqueValidatorDirective implements Validator, OnDestroy {
  @Input() keyUrl: string;
  @Input() keyId: number;
  @Input() keyField: string;

  controlValue = new Subject<any>();
  constructor(private http: HttpClient) {}

  validate(control: AbstractControl): Observable<{ [key: string]: any }> {
    return this.validateValue(control).pipe(first());
  }

  validateValue(control: AbstractControl) {
    this.controlValue.next();

    return control.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.controlValue),
      switchMap(value => {
        return this.validateToBackEnd(
          this.keyUrl,
          value,
          this.keyId,
          this.keyField
        ).pipe(
          switchMap(result => {
            if (result.status == 200) {
              return of(null);
            } else {
              return of({ asyncInvalid: true });
            }
          }),
          catchError(err => {
            return of({ asyncInvalid: true });
          })
        );
      })
    );
  }

  validateToBackEnd(
    keyUrl: string,
    keyValue: any,
    keyId: number,
    keyField: string
  ) {
    const params = {
      keyId,
      keyValue,
      keyField: keyField || null
    };

    return this.http.post<StatusResponse>(
      `${environment.restEndPoint}/${keyUrl}`,
      params
    );
  }

  ngOnDestroy() {}
}
