import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material/dialog";
import { EmploymentStatusFormComponent } from "./../components/employment-status-form/employment-status-form.component";

import { map } from "rxjs/operators";

import { environment } from "@env/environment";

import {
  EmploymentStatus,
  DataResponse,
  CreateResponse,
  UpdateResponse
} from "./../models";

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

    return this.http
      .get<DataResponse>(`${this.restEndPoint}/employment/status`, {
        params
      })
      .pipe(
        map(result => {
          const { data } = result;
          const newData = data.map(data => {
            data.employmentStatusTableHash =
              Date.now() + data.employmentStatusId;
            return data;
          });
          return { ...result, newData: data };
        })
      );
  }

  createEmploymentStatus(employmentStatus: EmploymentStatus) {
    return this.http.post<CreateResponse>(
      `${this.restEndPoint}/employment/status`,
      employmentStatus
    );
  }

  updateEmploymentStatus(employmentStatus: EmploymentStatus) {
    return this.http
      .put<UpdateResponse>(
        `${this.restEndPoint}/employment/status/${
          employmentStatus.employmentStatusId
        }`,
        employmentStatus
      )
      .pipe(
        map(result => {
          const { updatedData } = result;

          const newData = {
            ...updatedData,
            employmentStatusTableHash:
              employmentStatus.employmentStatusTableHash
          };

          return {
            ...result,
            updatedData: newData
          };
        })
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
