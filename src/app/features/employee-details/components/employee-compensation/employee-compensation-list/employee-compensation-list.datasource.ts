import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { EmployeeCompensation } from "./../../../models/employee-compensation.model";

export class EmployeeCompensationTableDataSource extends DataSource<
  EmployeeCompensation
> {
  constructor(private collections$: Observable<EmployeeCompensation[]>) {
    super();
  }

  connect(): Observable<EmployeeCompensation[]> {
    return this.collections$;
  }

  disconnect(): void {}
}
