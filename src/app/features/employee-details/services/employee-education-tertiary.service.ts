import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeEducationTertiaryFormComponent } from "./../components/employee-education/employee-education-tertiary/employee-education-tertiary-form/employee-education-tertiary-form.component";

import { environment } from "@env/environment";

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
  private restEndPoint: string = environment.restEndPoint;
  private dialogRef;
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  loadEducationTertiary(employeeId: number) {
    return this.http
      .get<DataResponse>(
        `${this.restEndPoint}/employee/education/tertiary/${employeeId}`
      )
      .pipe(
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
    return this.http
      .post(
        `${this.restEndPoint}/employee/education/tertiary/${employeeId}`,
        data
      )
      .pipe(
        map((result: CreateResponse) => {
          const { createdData } = result;
          const educTertiaryTableHash = Date.now() + createdData.educTertiaryId;
          const data = { ...createdData, educTertiaryTableHash };
          return { ...result, createdData: data };
        })
      );
  }

  updateEducationTertiary(data: EmployeeEducationTertiary) {
    return this.http
      .put<UpdateResponse>(
        `${this.restEndPoint}/employee/education/tertiary/${
          data.educTertiaryId
        }`,
        data
      )
      .pipe(
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
