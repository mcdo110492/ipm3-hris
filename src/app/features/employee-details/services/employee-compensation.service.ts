import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeCompensationFormComponent } from "./../components/employee-compensation/employee-compensation-form/employee-compensation-form.component";

import { environment } from "@env/environment";

import { map } from "rxjs/operators";

import { EmployeeCompensation } from "./../models/employee-compensation.model";
import { MomentService } from "@core/services/moment.service";
import { Observable } from "rxjs/Observable";

interface DataResponse {
  status: number;
  data: EmployeeCompensation[];
}

interface CreateResponse {
  status: number;
  message: string;
  createdData: EmployeeCompensation;
}

interface UpdateResponse {
  status: number;
  message: string;
  updatedData: EmployeeCompensation;
}

@Injectable()
export class EmployeeCompensationService {
  private restEndPoint: string = environment.restEndPoint;
  private dialogRef;
  constructor(
    private http: HttpClient,
    private moment: MomentService,
    private dialog: MatDialog
  ) {}

  loadCompensation(employeeId: number) {
    return this.http
      .get<DataResponse>(
        `${this.restEndPoint}/employee/compensations/${employeeId}`
      )
      .pipe(
        map(result => {
          const { data } = result;
          const newData = data.map(data => {
            data.compensationTableHash =
              Date.now() + data.employeeCompensationId;
            return data;
          });
          return { ...result, data: newData };
        })
      );
  }

  saveCompensation(data: EmployeeCompensation, employeeId: number) {
    const params = {
      ...data,
      effectiveDate: this.moment.parseDateToMoment(data.effectiveDate)
    };

    return this.http
      .post(`${this.restEndPoint}/employee/compensations/${employeeId}`, params)
      .pipe(
        map((result: CreateResponse) => {
          const { createdData } = result;
          const compensationTableHash =
            Date.now() + createdData.employeeCompensationId;
          const data = { ...createdData, compensationTableHash };
          return { ...result, createdData: data };
        })
      );
  }

  updateCompensation(data: EmployeeCompensation) {
    const params = {
      ...data,
      effectiveDate: this.moment.parseDateToMoment(data.effectiveDate)
    };

    return this.http
      .put<UpdateResponse>(
        `${this.restEndPoint}/employee/compensations/${
          data.employeeCompensationId
        }`,
        params
      )
      .pipe(
        map(result => {
          const { updatedData } = result;
          const { compensationTableHash } = data;
          const newData = { ...updatedData, compensationTableHash };
          return { ...result, updatedData: newData };
        })
      );
  }

  openForm() {
    this.dialogRef = this.dialog.open(EmployeeCompensationFormComponent, {
      width: "auto",
      disableClose: true
    });
  }

  closeForm() {
    this.dialogRef.close();
  }
}
