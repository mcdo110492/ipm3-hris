import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { EmployeeContract } from "./../../../models/employee-contract.model";

export class EmployeeContractTableDataSource extends DataSource<
  EmployeeContract
> {
  constructor(private collections$: Observable<EmployeeContract[]>) {
    super();
  }

  connect(): Observable<EmployeeContract[]> {
    return this.collections$;
  }

  disconnect(): void {}
}
