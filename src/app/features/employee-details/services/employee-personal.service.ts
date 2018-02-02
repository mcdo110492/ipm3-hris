import { Injectable } from "@angular/core";

import { EmployeePersonal } from "./../models/employee-personal.model";

import { HttpHelperService } from "@helper/services/http-helper.service";

import { MomentService } from "@core/services";

interface DataResponse {
  status: number;
  data: EmployeePersonal;
}

interface StatusResponse {
  status: number;
  message: string;
}

@Injectable()
export class EmployeePersonalService {
  private url: string = "/employee/personal";
  constructor(
    private httpHelper: HttpHelperService,
    private moment: MomentService
  ) {}

  loadPersonal(id: number) {
    const url = `${this.url}/${id}`;
    return this.httpHelper.httpGet<DataResponse>(url);
  }

  savePersonal(data: EmployeePersonal) {
    const url = `${this.url}/${data.employeeId}`;
    const body = {
      ...data,
      birthday: this.moment.parseDateToMoment(data.birthday)
    };
    return this.httpHelper.httpPut<StatusResponse>(url, body);
  }
}
