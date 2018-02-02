import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeEducationHighestFormComponent } from "./../components/employee-education/employee-education-highest/employee-education-highest-form/employee-education-highest-form.component";

import { map } from "rxjs/operators";

import { HttpHelperService } from "@helper/services/http-helper.service";

import { EmployeeEducationHighest } from "./../models/employee-education-highest.model";

interface DataResponse {
  status: number;
  data: EmployeeEducationHighest[];
}

interface CreateResponse {
  status: number;
  message: string;
  createdData: EmployeeEducationHighest;
}

interface UpdateResponse {
  status: number;
  message: string;
  updatedData: EmployeeEducationHighest;
}

@Injectable()
export class EmployeeEducationHighestService {
  private dialogRef;
  private url: string = "/employee/education/highest";
  constructor(
    private httpHelper: HttpHelperService,
    private dialog: MatDialog
  ) {}

  loadEducationHighest(employeeId: number) {
    const url = `${this.url}/${employeeId}`;
    return this.httpHelper.httpGet<DataResponse>(url).pipe(
      map(result => {
        const { data } = result;
        const newData = data.map(data => {
          data.educHighestTableHash = Date.now() + data.educHighestId;
          return data;
        });
        return { ...result, data: newData };
      })
    );
  }

  saveEducationHighest(data: EmployeeEducationHighest, employeeId: number) {
    const url = `${this.url}/${employeeId}`;
    return this.httpHelper.httpPost<CreateResponse>(url, data).pipe(
      map((result: CreateResponse) => {
        const { createdData } = result;
        const educHighestTableHash = Date.now() + createdData.educHighestId;
        const data = { ...createdData, educHighestTableHash };
        return { ...result, createdData: data };
      })
    );
  }

  updateEducationHighest(data: EmployeeEducationHighest) {
    const url = `${this.url}/${data.educHighestId}`;
    return this.httpHelper.httpPut<UpdateResponse>(url, data).pipe(
      map(result => {
        const { updatedData } = result;
        const { educHighestTableHash } = data;
        const newData = { ...updatedData, educHighestTableHash };
        return { ...result, updatedData: newData };
      })
    );
  }

  openForm() {
    this.dialogRef = this.dialog.open(EmployeeEducationHighestFormComponent, {
      width: "auto",
      disableClose: true
    });
  }

  closeForm() {
    this.dialogRef.close();
  }
}
