import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { EmployeeLicense } from "./../../../models/employee-license.model";

export class EmployeeLicenseTableDataSource extends DataSource<
  EmployeeLicense
> {
  constructor(private collections$: Observable<EmployeeLicense[]>) {
    super();
  }

  connect(): Observable<EmployeeLicense[]> {
    return this.collections$;
  }

  disconnect(): void {}
}
