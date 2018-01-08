import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { ContractType } from "./../../models";

export class ContractTypeTableDataSource extends DataSource<ContractType> {
  constructor(private collections$: Observable<ContractType[]>) {
    super();
  }

  connect(): Observable<ContractType[]> {
    return this.collections$;
  }

  disconnect(): void {}
}
