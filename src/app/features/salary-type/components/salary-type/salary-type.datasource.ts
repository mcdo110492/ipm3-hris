import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { SalaryType } from "./../../models";

export class SalaryTypeTableDataSource extends DataSource<SalaryType> {
  constructor(private collections$: Observable<SalaryType[]>) {
    super();
  }

  connect(): Observable<SalaryType[]> {
    return this.collections$;
  }

  disconnect(): void {}
}
