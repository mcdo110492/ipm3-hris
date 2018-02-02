import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { EmployeeClub } from "./../../../models/employee-club.model";

export class EmployeeClubTableDataSource extends DataSource<EmployeeClub> {
  constructor(private collections$: Observable<EmployeeClub[]>) {
    super();
  }

  connect(): Observable<EmployeeClub[]> {
    return this.collections$;
  }

  disconnect(): void {}
}
