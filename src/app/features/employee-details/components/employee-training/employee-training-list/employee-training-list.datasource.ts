import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { EmployeeTraining } from "./../../../models/employee-training.model";

export class EmployeeTrainingTableDataSource extends DataSource<
  EmployeeTraining
> {
  constructor(private collections$: Observable<EmployeeTraining[]>) {
    super();
  }

  connect(): Observable<EmployeeTraining[]> {
    return this.collections$;
  }

  disconnect(): void {}
}
