import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { EmployeeContact } from "./../models/employee-contact.model";

import { environment } from "@env/environment";

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
  private restEndPoint: string = environment.restEndPoint;
  constructor(private http: HttpClient) {}

  loadContact(id: number) {
    return this.http.get<DataResponse>(
      `${this.restEndPoint}/employee/contact/${id}`
    );
  }

  saveContact(data: EmployeeContact) {
    return this.http.put<StatusResponse>(
      `${this.restEndPoint}/employee/contact/${data.employeeContactId}`,
      data
    );
  }
}
