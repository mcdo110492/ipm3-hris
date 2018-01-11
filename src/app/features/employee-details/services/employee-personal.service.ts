import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { EmployeePersonal } from "./../models/employee-personal.model";

import { environment } from "@env/environment";

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
  private restEndPoint: string = environment.restEndPoint;
  constructor(private http: HttpClient, private moment: MomentService) {}

  loadPersonal(id: number) {
    return this.http.get<DataResponse>(
      `${this.restEndPoint}/employee/personal/${id}`
    );
  }

  savePersonal(data: EmployeePersonal) {
    const {
      employeeId,
      employeeNumber,
      firstName,
      middleName,
      lastName,
      birthday,
      placeOfBirth,
      civilStatus,
      citizenship,
      religion
    } = data;
    const newData = {
      employeeId,
      employeeNumber,
      firstName,
      middleName,
      lastName,
      placeOfBirth,
      citizenship,
      civilStatus,
      religion,
      birthday: this.moment.parseDateToMoment(birthday)
    };

    return this.http.put<StatusResponse>(
      `${this.restEndPoint}/employee/personal/${employeeId}`,
      newData
    );
  }
}
