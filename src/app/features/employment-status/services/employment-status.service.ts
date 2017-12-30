import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material/dialog";
import { EmploymentStatusFormComponent } from "./../components/employment-status-form/employment-status-form.component";

import { environment } from "@env/environment";

import { EmploymentStatus, DataResponse, StatusResponse } from "./../models";

@Injectable()
export class EmploymentStatusService {
  private restEndPoint: string = environment.restEndPoint;
  private dialogRef;
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  getEmploymentStatus(
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

    return this.http.get<DataResponse>(
      `${this.restEndPoint}/employment/status`,
      {
        params
      }
    );
  }

  createEmploymentStatus(employmentStatus: EmploymentStatus) {
    return this.http.post<StatusResponse>(
      `${this.restEndPoint}/employment/status`,
      employmentStatus
    );
  }

  updateEmploymentStatus(employmentStatus: EmploymentStatus) {
    return this.http.put<StatusResponse>(
      `${this.restEndPoint}/employment/status/${
        employmentStatus.employmentStatusId
      }`,
      employmentStatus
    );
  }

  openForm() {
    this.dialogRef = this.dialog.open(EmploymentStatusFormComponent, {
      width: "auto",
      disableClose: true
    });
  }

  closeForm() {
    this.dialogRef.close();
  }
}
