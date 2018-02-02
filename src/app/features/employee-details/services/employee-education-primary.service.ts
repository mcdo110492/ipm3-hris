import { Injectable } from "@angular/core";

import { EmployeeEducationPrimary } from "./../models/employee-education-primary.model";

import { HttpHelperService } from "@helper/services/http-helper.service";

interface DataResponse {
  status: number;
  data: EmployeeEducationPrimary;
}

interface StatusResponse {
  status: number;
  message: string;
}

@Injectable()
export class EmployeeEducationPrimaryService {
  private url: string = "/employee/education/primary";

  constructor(private httpHelper: HttpHelperService) {}

  loadPrimary(id: number) {
    const url = `${this.url}/${id}`;
    return this.httpHelper.httpGet<DataResponse>(url);
  }

  savePrimary(data: EmployeeEducationPrimary) {
    const url = `${this.url}/${data.educPrimaryId}`;
    return this.httpHelper.httpPut<StatusResponse>(url, data);
  }
}
