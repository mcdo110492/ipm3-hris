import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { MomentService } from "@core/services";

import { environment } from "@env/environment";

import { EmployeeRegister } from "./../models";

@Injectable()
export class EmployeeRegisterService {
  private restEndPoint: string = environment.restEndPoint;
  constructor(private http: HttpClient, private moment: MomentService) {}

  submitForm(data: EmployeeRegister, project: number) {
    const formData = {
      employeeNumber: data.personal.employeeNumber,
      firstName: data.personal.firstName,
      middleName: data.personal.middleName,
      lastName: data.personal.lastName,
      birthday: this.moment.parseDateToMoment(data.personal.birthday),
      placeOfBirth: data.personal.placeOfBirth,
      civilStatus: data.personal.civilStatus,
      citizenship: data.personal.citizenship,
      religion: data.personal.religion,
      positionId: data.employment.positionId,
      employeeStatusId: data.employment.employeeStatusId,
      employmentStatusId: data.employment.employmentStatusId,
      dateHired: this.moment.parseDateToMoment(data.employment.dateHired),
      contractStart: this.moment.parseDateToMoment(
        data.employment.contractStart
      ),
      contractEnd: this.moment.parseDateToMoment(data.employment.contractEnd),
      contractTypeId: data.employment.contractTypeId,
      projectId: project
    };
    return this.http.post(`${this.restEndPoint}/employee/register`, formData);
  }
}
