import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { EmployeeEducationTertiary } from "./../../../../models/employee-education-tertiary.model";

export class EmployeeEducationTertiaryTableDataSource extends DataSource<
  EmployeeEducationTertiary
> {
  constructor(private collections$: Observable<EmployeeEducationTertiary[]>) {
    super();
  }

  connect(): Observable<EmployeeEducationTertiary[]> {
    return this.collections$;
  }

  disconnect(): void {}
}
