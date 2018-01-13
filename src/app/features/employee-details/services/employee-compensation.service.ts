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
          return {
            data: newData
          };
        })
      );
  }

  saveCompensation(data: EmployeeCompensation, employeeId: number) {
    const {
      employeeCompensationId,
      salaryTypeId,
      salary,
      effectiveDate,
      remarks
    } = data;

    const params = {
      employeeCompensationId,
      salaryTypeId,
      salary,
      effectiveDate: this.moment.parseDateToMoment(effectiveDate),
      remarks
    };

    return this.http
      .post(`${this.restEndPoint}/employee/compensations/${employeeId}`, params)
      .pipe(
        map((result: CreateResponse) => {
          const { status, message, createdData } = result;
          const {
            employeeCompensationId,
            employeeId,
            salaryTypeId,
            salary,
            salaryTypeCode,
            salaryTypeName,
            effectiveDate,
            remarks,
            created_at,
            updated_at
          } = createdData;
          const data = {
            employeeCompensationId,
            employeeId,
            salaryTypeId,
            salaryTypeCode,
            salaryTypeName,
            salary,
            effectiveDate,
            remarks,
            created_at,
            updated_at,
            compensationTableHash: Date.now() + employeeCompensationId
          };
          return { createdData: data };
        })
      );
  }

  updateCompensation(data: EmployeeCompensation) {
    const {
      employeeCompensationId,
      salaryTypeId,
      salary,
      salaryTypeCode,
      salaryTypeName,
      effectiveDate,
      remarks,
      compensationTableHash
    } = data;

    const params = {
      employeeCompensationId,
      salaryTypeId,
      salary,
      effectiveDate: this.moment.parseDateToMoment(effectiveDate),
      remarks
    };

    return this.http
      .put<UpdateResponse>(
        `${this.restEndPoint}/employee/compensations/${employeeCompensationId}`,
        params
      )
      .pipe(
        map(result => {
          const { status, message, updatedData } = result;
          const {
            employeeCompensationId,
            employeeId,
            salaryTypeId,
            salary,
            salaryTypeCode,
            salaryTypeName,
            effectiveDate,
            remarks,
            created_at,
            updated_at
          } = updatedData;
          const newData = {
            employeeCompensationId,
            employeeId,
            salaryTypeId,
            salaryTypeCode,
            salaryTypeName,
            salary,
            effectiveDate,
            remarks,
            created_at,
            updated_at,
            compensationTableHash: compensationTableHash
          };
          return { status, message, updatedData: newData };
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
