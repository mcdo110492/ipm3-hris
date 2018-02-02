import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeCompensationFormComponent } from "./../components/employee-compensation/employee-compensation-form/employee-compensation-form.component";

import { map } from "rxjs/operators";

import { HttpHelperService } from "@helper/services/http-helper.service";

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
  private dialogRef;
  private url: string = "/employee/compensations";
  constructor(
    private httpHelper: HttpHelperService,
    private moment: MomentService,
    private dialog: MatDialog
  ) {}

  loadCompensation(employeeId: number) {
    const url = `${this.url}/${employeeId}`;
    return this.httpHelper.httpGet<DataResponse>(url).pipe(
      map(result => {
        const { data } = result;
        const newData = data.map(data => {
          data.compensationTableHash = Date.now() + data.employeeCompensationId;
          return data;
        });
        return { ...result, data: newData };
      })
    );
  }

  saveCompensation(data: EmployeeCompensation, employeeId: number) {
    const url = `${this.url}/${employeeId}`;
    const body = {
      ...data,
      effectiveDate: this.moment.parseDateToMoment(data.effectiveDate)
    };

    return this.httpHelper.httpPost<CreateResponse>(url, body).pipe(
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
    const url = `${this.url}/${data.employeeCompensationId}`;
    const body = {
      ...data,
      effectiveDate: this.moment.parseDateToMoment(data.effectiveDate)
    };

    return this.httpHelper.httpPut<UpdateResponse>(url, body).pipe(
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
