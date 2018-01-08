import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeStatusFormComponent } from "./../components/employee-status-form/employee-status-form.component";

import { map } from "rxjs/operators";

import { environment } from "@env/environment";

import {
  EmployeeStatus,
  DataResponse,
  CreateResponse,
  UpdateResponse
} from "./../models";

@Injectable()
export class EmployeeStatusService {
  private restEndPoint: string = environment.restEndPoint;
  private dialogRef;
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  getEmployeeStatus(
    pageIndex: number,
    pageSize: number,
    sortField: string,
    sortDirection: string,
    searchQuery: string
  ) {
    const page = (pageIndex + 1).toString();
    const params = new HttpParams()
      .set("filter", searchQuery)
      .append("field", sortField)
      .append("order", sortDirection)
      .append("limit", pageSize.toString())
      .append("page", page);

    return this.http
      .get<DataResponse>(`${this.restEndPoint}/employee/status`, {
        params
      })
      .pipe(
        map(result => {
          const { data, count } = result;
          const newData = data.map(data => {
            data.employeeStatusTableHash = Date.now() + data.employeeStatusId;
            return data;
          });
          return {
            count,
            data: newData
          };
        })
      );
  }

  createEmployeeStatus(employeeStatus: EmployeeStatus) {
    return this.http.post<CreateResponse>(
      `${this.restEndPoint}/employee/status`,
      employeeStatus
    );
  }

  updateEmployeeStatus(employeeStatus: EmployeeStatus) {
    return this.http
      .put<UpdateResponse>(
        `${this.restEndPoint}/employee/status/${
          employeeStatus.employeeStatusId
        }`,
        employeeStatus
      )
      .pipe(
        map(result => {
          const {
            employeeStatusId,
            employeeStatusCode,
            employeeStatusName,
            created_at,
            updated_at
          } = result.updatedData;
          const updatedData: EmployeeStatus = {
            employeeStatusId,
            employeeStatusCode,
            employeeStatusName,
            created_at,
            updated_at,
            employeeStatusTableHash: employeeStatus.employeeStatusTableHash
          };
          return { updatedData };
        })
      );
  }

  openForm() {
    this.dialogRef = this.dialog.open(EmployeeStatusFormComponent, {
      width: "auto",
      disableClose: true
    });
  }

  closeForm() {
    this.dialogRef.close();
  }
}
