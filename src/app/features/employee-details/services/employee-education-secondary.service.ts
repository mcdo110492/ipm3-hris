import { Injectable } from "@angular/core";

import { EmployeeEducationSecondary } from "./../models/employee-education-secondary.model";

import { HttpHelperService } from "@helper/services/http-helper.service";

interface DataResponse {
  status: number;
  data: EmployeeEducationSecondary;
}

interface StatusResponse {
  status: number;
  message: string;
}

@Injectable()
export class EmployeeEducationSecondaryService {
  private url = "/employee/education/secondary";
  constructor(private httpHelper: HttpHelperService) {}

  loadSecondary(id: number) {
    const url = `${this.url}/${id}`;
    return this.httpHelper.httpGet<DataResponse>(url);
  }

  saveSecondary(data: EmployeeEducationSecondary) {
    const url = `${this.url}/${data.educSecondaryId}`;
    return this.httpHelper.httpPut<StatusResponse>(url, data);
  }
}
