import { Injectable } from "@angular/core";

import { EmployeeGovernment } from "./../models/employee-government.model";

import { HttpHelperService } from "@helper/services/http-helper.service";

interface DataResponse {
  status: number;
  data: EmployeeGovernment;
}

interface StatusResponse {
  status: number;
  message: string;
}

@Injectable()
export class EmployeeGovernmentService {
  private url: string = "/employee/government";
  constructor(private httpHelper: HttpHelperService) {}

  loadGovernment(id: number) {
    const url = `${this.url}/${id}`;
    return this.httpHelper.httpGet<DataResponse>(url);
  }

  saveGovernment(data: EmployeeGovernment) {
    const url = `${this.url}/${data.employeeGovernmentId}`;
    return this.httpHelper.httpPut<StatusResponse>(url, data);
  }
}
