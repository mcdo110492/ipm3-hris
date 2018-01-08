import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { EmployeeList } from "./../../models/employee-list.model";

export class EmployeeListTableDataSource extends DataSource<EmployeeList> {
  constructor(private collections$: Observable<EmployeeList[]>) {
    super();
  }

  connect(): Observable<EmployeeList[]> {
    return this.collections$;
  }

  disconnect(): void {}
}
