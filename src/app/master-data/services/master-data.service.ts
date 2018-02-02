import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { HttpHelperService } from "@helper/services";

import {
  ProjectResponse,
  PositionResponse,
  EmployeeStatusResponse,
  EmploymentStatusResponse,
  ContractTypeResponse,
  SalaryTypeResponse
} from "./../models";

@Injectable()
export class MasterDataService {
  constructor(private httpHelper: HttpHelperService) {}

  getAllProjects(): Observable<ProjectResponse> {
    const url = "/projects/all";
    return this.httpHelper.httpGet<ProjectResponse>(url);
  }

  getAllPositions(): Observable<PositionResponse> {
    const url = "/positions/all";
    return this.httpHelper.httpGet<PositionResponse>(url);
  }

  getAllEmploymentStatus(): Observable<EmploymentStatusResponse> {
    const url = "/employment/status/all";
    return this.httpHelper.httpGet<EmploymentStatusResponse>(url);
  }

  getAllEmployeeStatus(): Observable<EmployeeStatusResponse> {
    const url = "/employee/status/all";
    return this.httpHelper.httpGet<EmployeeStatusResponse>(url);
  }

  getAllContractType(): Observable<ContractTypeResponse> {
    const url = "/contract/types/all";
    return this.httpHelper.httpGet<ContractTypeResponse>(url);
  }

  getAllSalaryType(): Observable<SalaryTypeResponse> {
    const url = "/salary/types/all";
    return this.httpHelper.httpGet<SalaryTypeResponse>(url);
  }
}
