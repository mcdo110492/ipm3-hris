import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { EmployeeHealth } from "./../models/employee-health.model";

import { environment } from "@env/environment";

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
  private restEndPoint: string = environment.restEndPoint;
  constructor(private http: HttpClient) {}

  loadHealth(id: number) {
    return this.http.get<DataResponse>(
      `${this.restEndPoint}/employee/health/${id}`
    );
  }

  saveHealth(data: EmployeeHealth) {
    return this.http.put<StatusResponse>(
      `${this.restEndPoint}/employee/health/${data.employeeHealthId}`,
      data
    );
  }
}
