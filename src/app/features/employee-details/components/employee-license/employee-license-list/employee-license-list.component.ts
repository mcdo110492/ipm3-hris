import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as LicenseActions from "./../../../store/actions/employee-license.action";
import * as fromLicense from "./../../../store/reducers/employee-license.reducer";
import * as LicenseSelectors from "./../../../store/selectors/employee-license.selector";

import { EmployeeLicense } from "./../../../models/employee-license.model";
import { EmployeeLicenseTableDataSource } from "./employee-license-list.datasource";

import { EmployeeLicenseService } from "./../../../services/employee-license.service";

@Component({
  selector: "app-employee-license-list",
  templateUrl: "./employee-license-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeLicenseListComponent implements OnInit {
  displayedColumns = [
    "licenseNumber",
    "licenseType",
    "dateIssued",
    "dateExpiry",
    "actions"
  ];
  dataSource: EmployeeLicenseTableDataSource | null;
  collections$: Observable<EmployeeLicense[]>;
  isLoading$: Observable<boolean>;
  isLoaded$: Observable<boolean>;
  constructor(
    private store$: Store<fromLicense.State>,
    private service: EmployeeLicenseService
  ) {}

  ngOnInit() {
    this.collections$ = this.store$.select(LicenseSelectors.getLicenseData);
    this.isLoading$ = this.store$.select(LicenseSelectors.getLicenseIsLoading);
    this.isLoaded$ = this.store$.select(LicenseSelectors.getLicenseIsLoaded);

    this.dataSource = new EmployeeLicenseTableDataSource(this.collections$);

    this.store$.dispatch(new LicenseActions.LoadLicense());
  }

  create() {
    this.store$.dispatch(new LicenseActions.SelectLicense(null));
    this.service.openForm();
  }

  update(id: number) {
    this.store$.dispatch(new LicenseActions.SelectLicense(id));
    this.service.openForm();
  }
}
