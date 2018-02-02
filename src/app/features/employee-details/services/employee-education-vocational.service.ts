import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeEducationVocationalFormComponent } from "./../components/employee-education/employee-education-vocational/employee-education-vocational-form/employee-education-vocational-form.component";

import { environment } from "@env/environment";

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
  private restEndPoint: string = environment.restEndPoint;
  private dialogRef;
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  loadEducationVocational(employeeId: number) {
    return this.http
      .get<DataResponse>(
        `${this.restEndPoint}/employee/education/vocational/${employeeId}`
      )
      .pipe(
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
    return this.http
      .post(
        `${this.restEndPoint}/employee/education/vocational/${employeeId}`,
        data
      )
      .pipe(
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
    return this.http
      .put<UpdateResponse>(
        `${this.restEndPoint}/employee/education/vocational/${
          data.educVocationalId
        }`,
        data
      )
      .pipe(
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
