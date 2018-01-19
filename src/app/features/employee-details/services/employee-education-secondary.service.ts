import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { EmployeeEducationSecondary } from "./../models/employee-education-secondary.model";

import { environment } from "@env/environment";

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
  private restEndPoint: string = environment.restEndPoint;
  constructor(private http: HttpClient) {}

  loadSecondary(id: number) {
    return this.http.get<DataResponse>(
      `${this.restEndPoint}/employee/education/secondary/${id}`
    );
  }

  saveSecondary(data: EmployeeEducationSecondary) {
    return this.http.put<StatusResponse>(
      `${this.restEndPoint}/employee/education/secondary/${
        data.educSecondaryId
      }`,
      data
    );
  }
}
