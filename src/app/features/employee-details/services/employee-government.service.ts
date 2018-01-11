import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { EmployeeGovernment } from "./../models/employee-government.model";

import { environment } from "@env/environment";

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
  private restEndPoint: string = environment.restEndPoint;
  constructor(private http: HttpClient) {}

  loadGovernment(id: number) {
    return this.http.get<DataResponse>(
      `${this.restEndPoint}/employee/government/${id}`
    );
  }

  saveGovernment(data: EmployeeGovernment) {
    return this.http.put<StatusResponse>(
      `${this.restEndPoint}/employee/government/${data.employeeGovernmentId}`,
      data
    );
  }
}
