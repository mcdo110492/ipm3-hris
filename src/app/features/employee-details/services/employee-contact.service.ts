import { Injectable } from "@angular/core";

import { EmployeeContact } from "./../models/employee-contact.model";

import { HttpHelperService } from "@helper/services/http-helper.service";

interface DataResponse {
  status: number;
  data: EmployeeContact;
}

interface StatusResponse {
  status: number;
  message: string;
}

@Injectable()
export class EmployeeContactService {
  private url: string = "/employee/contact";
  constructor(private httpHelper: HttpHelperService) {}

  loadContact(id: number) {
    const url = `${this.url}/${id}`;
    return this.httpHelper.httpGet<DataResponse>(url);
  }

  saveContact(data: EmployeeContact) {
    const url = `${this.url}/${data.employeeContactId}`;
    return this.httpHelper.httpPut<StatusResponse>(url, data);
  }
}
