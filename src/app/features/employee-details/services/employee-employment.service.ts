import { Injectable } from "@angular/core";

import { EmployeeEmployment } from "./../models/employee-employment.model";

import { HttpHelperService } from "@helper/services/http-helper.service";

import { MomentService } from "@core/services";

interface DataResponse {
  status: number;
  data: EmployeeEmployment;
}

interface StatusResponse {
  status: number;
  message: string;
}

@Injectable()
export class EmployeeEmploymentService {
  private url: string = "/employee/employment";
  constructor(
    private httpHelper: HttpHelperService,
    private moment: MomentService
  ) {}

  loadEmployment(id: number) {
    const url = `${this.url}/${id}`;
    return this.httpHelper.httpGet<DataResponse>(url);
  }

  saveEmployment(data: EmployeeEmployment) {
    const url = `${this.url}/${data.employeeEmploymentId}`;
    const { employeeEmploymentId } = data;
    const body = {
      ...data,
      dateHired: this.moment.parseDateToMoment(data.dateHired)
    };

    return this.httpHelper.httpPut<StatusResponse>(url, body);
  }
}
