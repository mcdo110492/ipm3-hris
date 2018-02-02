import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as ContractActions from "./../../../store/actions/employee-contract.action";
import * as fromContract from "./../../../store/reducers/employee-contract.reducer";
import * as ContractSelectors from "./../../../store/selectors/employee-contract.selector";

import { EmployeeContract } from "./../../../models/employee-contract.model";
import { EmployeeContractTableDataSource } from "./employee-contract-list.datasource";

import { EmployeeContractService } from "./../../../services/employee-contract.service";

@Component({
  selector: "app-employee-contract-list",
  templateUrl: "./employee-contract-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeContractListComponent implements OnInit {
  displayedColumns = [
    "contractType",
    "contractStart",
    "contractEnd",
    "contractExtension",
    "remarks",
    "actions"
  ];
  dataSource: EmployeeContractTableDataSource | null;
  collections$: Observable<EmployeeContract[]>;
  isLoading$: Observable<boolean>;
  isLoaded$: Observable<boolean>;
  constructor(
    private store$: Store<fromContract.State>,
    private service: EmployeeContractService
  ) {}

  ngOnInit() {
    this.collections$ = this.store$.select(ContractSelectors.getContractData);
    this.isLoading$ = this.store$.select(
      ContractSelectors.getContractIsLoading
    );
    this.isLoaded$ = this.store$.select(ContractSelectors.getContractIsLoaded);

    this.dataSource = new EmployeeContractTableDataSource(this.collections$);

    this.store$.dispatch(new ContractActions.LoadContract());
  }

  create() {
    this.store$.dispatch(new ContractActions.SelectContract(null));
    this.service.openForm();
  }

  update(id: number) {
    this.store$.dispatch(new ContractActions.SelectContract(id));
    this.service.openForm();
  }
}
