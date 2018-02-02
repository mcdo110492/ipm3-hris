import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { EmployeeEducationHighest } from "./../../../../models/employee-education-highest.model";

export class EmployeeEducationHighestTableDataSource extends DataSource<
  EmployeeEducationHighest
> {
  constructor(private collections$: Observable<EmployeeEducationHighest[]>) {
    super();
  }

  connect(): Observable<EmployeeEducationHighest[]> {
    return this.collections$;
  }

  disconnect(): void {}
}
