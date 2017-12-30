import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { EmploymentStatus } from "./../../models/employment-status.model";

export class EmploymentStatusTableDataSource extends DataSource<
  EmploymentStatus
> {
  constructor(private collections$: Observable<EmploymentStatus[]>) {
    super();
  }

  connect(): Observable<EmploymentStatus[]> {
    return this.collections$;
  }

  disconnect(): void {}
}
