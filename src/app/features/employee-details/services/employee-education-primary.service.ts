import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { EmployeeEducationPrimary } from "./../models/employee-education-primary.model";

import { environment } from "@env/environment";

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
  private restEndPoint: string = environment.restEndPoint;
  constructor(private http: HttpClient) {}

  loadPrimary(id: number) {
    return this.http.get<DataResponse>(
      `${this.restEndPoint}/employee/education/primary/${id}`
    );
  }

  savePrimary(data: EmployeeEducationPrimary) {
    return this.http.put<StatusResponse>(
      `${this.restEndPoint}/employee/education/primary/${data.educPrimaryId}`,
      data
    );
  }
}
