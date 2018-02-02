import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeEducationTertiaryFormComponent } from "./../components/employee-education/employee-education-tertiary/employee-education-tertiary-form/employee-education-tertiary-form.component";

import { HttpHelperService } from "@helper/services/http-helper.service";

import { map } from "rxjs/operators";

import { EmployeeEducationTertiary } from "./../models/employee-education-tertiary.model";

interface DataResponse {
  status: number;
  data: EmployeeEducationTertiary[];
}

interface CreateResponse {
  status: number;
  message: string;
  createdData: EmployeeEducationTertiary;
}

interface UpdateResponse {
  status: number;
  message: string;
  updatedData: EmployeeEducationTertiary;
}

@Injectable()
export class EmployeeEducationTertiaryService {
  private dialogRef;
  private url: string = "/employee/education/tertiary";
  constructor(
    private httpHelper: HttpHelperService,
    private dialog: MatDialog
  ) {}

  loadEducationTertiary(employeeId: number) {
    const url = `${this.url}/${employeeId}`;
    return this.httpHelper.httpGet<DataResponse>(url).pipe(
      map(result => {
        const { data } = result;
        const newData = data.map(data => {
          data.educTertiaryTableHash = Date.now() + data.educTertiaryId;
          return data;
        });
        return { ...result, data: newData };
      })
    );
  }

  saveEducationTertiary(data: EmployeeEducationTertiary, employeeId: number) {
    const url = `${this.url}/${employeeId}`;
    return this.httpHelper.httpPost<CreateResponse>(url, data).pipe(
      map((result: CreateResponse) => {
        const { createdData } = result;
        const educTertiaryTableHash = Date.now() + createdData.educTertiaryId;
        const data = { ...createdData, educTertiaryTableHash };
        return { ...result, createdData: data };
      })
    );
  }

  updateEducationTertiary(data: EmployeeEducationTertiary) {
    const url = `${this.url}/${data.educTertiaryId}`;
    return this.httpHelper.httpPut<UpdateResponse>(url, data).pipe(
      map(result => {
        const { updatedData } = result;
        const { educTertiaryTableHash } = data;
        const newData = { ...updatedData, educTertiaryTableHash };
        return { ...result, updatedData: newData };
      })
    );
  }

  openForm() {
    this.dialogRef = this.dialog.open(EmployeeEducationTertiaryFormComponent, {
      width: "auto",
      disableClose: true
    });
  }

  closeForm() {
    this.dialogRef.close();
  }
}
