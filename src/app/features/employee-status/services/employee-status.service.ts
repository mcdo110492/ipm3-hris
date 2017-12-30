import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeStatusFormComponent } from "./../components/employee-status-form/employee-status-form.component";

import { environment } from "@env/environment";

import { EmployeeStatus, DataResponse, StatusResponse } from "./../models";

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

    return this.http.get<DataResponse>(`${this.restEndPoint}/employee/status`, {
      params
    });
  }

  createEmployeeStatus(employeeStatus: EmployeeStatus) {
    return this.http.post<StatusResponse>(
      `${this.restEndPoint}/employee/status`,
      employeeStatus
    );
  }

  updateEmployeeStatus(employeeStatus: EmployeeStatus) {
    return this.http.put<StatusResponse>(
      `${this.restEndPoint}/employee/status/${employeeStatus.employeeStatusId}`,
      employeeStatus
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
