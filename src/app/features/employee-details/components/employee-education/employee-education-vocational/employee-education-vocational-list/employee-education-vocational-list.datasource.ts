import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { EmployeeEducationVocational } from "./../../../../models/employee-education-vocational.model";

export class EmployeeEducationVocationalTableDataSource extends DataSource<
  EmployeeEducationVocational
> {
  constructor(private collections$: Observable<EmployeeEducationVocational[]>) {
    super();
  }

  connect(): Observable<EmployeeEducationVocational[]> {
    return this.collections$;
  }

  disconnect(): void {}
}
