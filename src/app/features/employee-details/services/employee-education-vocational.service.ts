import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeEducationVocationalFormComponent } from "./../components/employee-education/employee-education-vocational/employee-education-vocational-form/employee-education-vocational-form.component";

import { HttpHelperService } from "@helper/services/http-helper.service";

import { map } from "rxjs/operators";

import { EmployeeEducationVocational } from "./../models/employee-education-vocational.model";

interface DataResponse {
  status: number;
  data: EmployeeEducationVocational[];
}

interface CreateResponse {
  status: number;
  message: string;
  createdData: EmployeeEducationVocational;
}

interface UpdateResponse {
  status: number;
  message: string;
  updatedData: EmployeeEducationVocational;
}

@Injectable()
export class EmployeeEducationVocationalService {
  private dialogRef;
  private url: string = "/employee/education/vocational";
  constructor(
    private httpHelper: HttpHelperService,
    private dialog: MatDialog
  ) {}

  loadEducationVocational(employeeId: number) {
    const url = `${this.url}/${employeeId}`;
    return this.httpHelper.httpGet<DataResponse>(url).pipe(
      map(result => {
        const { data } = result;
        const newData = data.map(data => {
          data.educVocationalTableHash = Date.now() + data.educVocationalId;
          return data;
        });
        return { ...result, data: newData };
      })
    );
  }

  saveEducationVocational(
    data: EmployeeEducationVocational,
    employeeId: number
  ) {
    const url = `${this.url}/${employeeId}`;
    return this.httpHelper.httpPost<CreateResponse>(url, data).pipe(
      map((result: CreateResponse) => {
        const { createdData } = result;
        const educVocationalTableHash =
          Date.now() + createdData.educVocationalId;
        const data = { ...createdData, educVocationalTableHash };
        return { ...result, createdData: data };
      })
    );
  }

  updateEducationVocational(data: EmployeeEducationVocational) {
    const url = `${this.url}/${data.educVocationalId}`;
    return this.httpHelper.httpPut<UpdateResponse>(url, data).pipe(
      map(result => {
        const { updatedData } = result;
        const { educVocationalTableHash } = data;
        const newData = { ...updatedData, educVocationalTableHash };
        return { ...result, updatedData: newData };
      })
    );
  }

  openForm() {
    this.dialogRef = this.dialog.open(
      EmployeeEducationVocationalFormComponent,
      {
        width: "auto",
        disableClose: true
      }
    );
  }

  closeForm() {
    this.dialogRef.close();
  }
}
