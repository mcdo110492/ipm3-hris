import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { EmploymentStatusFormComponent } from "./../components/employment-status-form/employment-status-form.component";

import { map } from "rxjs/operators";

import { HttpHelperService } from "@helper/services/http-helper.service";

import {
  EmploymentStatus,
  DataResponse,
  CreateResponse,
  UpdateResponse
} from "./../models";

@Injectable()
export class EmploymentStatusService {
  private dialogRef;
  private url: string = "/employment/status";
  constructor(
    private dialog: MatDialog,
    private httpHelper: HttpHelperService
  ) {}
  getEmploymentStatus(
    pageIndex: number,
    pageSize: number,
    sortField: string,
    sortDirection: string,
    searchQuery: string
  ) {
    const page = (pageIndex + 1).toString();
    const params = {
      filter: searchQuery,
      field: sortField,
      order: sortDirection,
      limit: pageSize.toString(),
      page
    };

    return this.httpHelper.httpTableGet<DataResponse>(this.url, params).pipe(
      map(result => {
        const { data } = result;
        const newData = data.map(data => {
          data.employmentStatusTableHash = Date.now() + data.employmentStatusId;
          return data;
        });
        return { ...result, newData: data };
      })
    );
  }

  createEmploymentStatus(employmentStatus: EmploymentStatus) {
    return this.httpHelper.httpPost<CreateResponse>(this.url, employmentStatus);
  }

  updateEmploymentStatus(employmentStatus: EmploymentStatus) {
    const url = `${this.url}/${employmentStatus.employmentStatusId}`;

    return this.httpHelper.httpPut<UpdateResponse>(url, employmentStatus).pipe(
      map(result => {
        const { updatedData } = result;

        const newData = {
          ...updatedData,
          employmentStatusTableHash: employmentStatus.employmentStatusTableHash
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
