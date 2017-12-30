import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { EmployeeStatus } from "./../../models/employee-status.model";

export class EmployeeStatusTableDataSource extends DataSource<EmployeeStatus> {
  constructor(private collections$: Observable<EmployeeStatus[]>) {
    super();
  }

  connect(): Observable<EmployeeStatus[]> {
    return this.collections$;
  }

  disconnect(): void {}
}
