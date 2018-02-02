import { Injectable } from "@angular/core";

import { EmployeeHealth } from "./../models/employee-health.model";

import { HttpHelperService } from "@helper/services/http-helper.service";

interface DataResponse {
  status: number;
  data: EmployeeHealth;
}

interface StatusResponse {
  status: number;
  message: string;
}

@Injectable()
export class EmployeeHealthService {
  private url: string = "/employee/health";
  constructor(private httpHelper: HttpHelperService) {}

  loadHealth(id: number) {
    const url = `${this.url}/${id}`;
    return this.httpHelper.httpGet<DataResponse>(url);
  }

  saveHealth(data: EmployeeHealth) {
    const url = `${this.url}/${data.employeeHealthId}`;
    return this.httpHelper.httpPut<StatusResponse>(url, data);
  }
}
