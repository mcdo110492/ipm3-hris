import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { EmployeeEmployment } from "./../models/employee-employment.model";

import { environment } from "@env/environment";

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
  private restEndPoint: string = environment.restEndPoint;
  constructor(private http: HttpClient, private moment: MomentService) {}

  loadEmployment(id: number) {
    return this.http.get<DataResponse>(
      `${this.restEndPoint}/employee/employment/${id}`
    );
  }

  saveEmployment(data: EmployeeEmployment) {
    const { employeeEmploymentId } = data;
    const newData = {
      ...data,
      dateHired: this.moment.parseDateToMoment(data.dateHired),
      contractStart: this.moment.parseDateToMoment(data.contractStart),
      contractEnd: this.moment.parseDateToMoment(data.contractEnd)
    };

    return this.http.put<StatusResponse>(
      `${this.restEndPoint}/employee/employment/${employeeEmploymentId}`,
      newData
    );
  }
}
