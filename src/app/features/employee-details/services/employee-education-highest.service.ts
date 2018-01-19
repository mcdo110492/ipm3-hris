import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeEducationHighestFormComponent } from "./../components/employee-education/employee-education-highest/employee-education-highest-form/employee-education-highest-form.component";

import { environment } from "@env/environment";

import { map } from "rxjs/operators";

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
  private restEndPoint: string = environment.restEndPoint;
  private dialogRef;
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  loadEducationHighest(employeeId: number) {
    return this.http
      .get<DataResponse>(
        `${this.restEndPoint}/employee/education/highest/${employeeId}`
      )
      .pipe(
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
    return this.http
      .post(
        `${this.restEndPoint}/employee/education/highest/${employeeId}`,
        data
      )
      .pipe(
        map((result: CreateResponse) => {
          const { createdData } = result;
          const educHighestTableHash = Date.now() + createdData.educHighestId;
          const data = { ...createdData, educHighestTableHash };
          return { ...result, createdData: data };
        })
      );
  }

  updateEducationHighest(data: EmployeeEducationHighest) {
    return this.http
      .put<UpdateResponse>(
        `${this.restEndPoint}/employee/education/highest/${data.educHighestId}`,
        data
      )
      .pipe(
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
