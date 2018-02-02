import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeStatusFormComponent } from "./../components/employee-status-form/employee-status-form.component";

import { map } from "rxjs/operators";

import { HttpHelperService } from "@helper/services/http-helper.service";

import {
  EmployeeStatus,
  DataResponse,
  CreateResponse,
  UpdateResponse
} from "./../models";

@Injectable()
export class EmployeeStatusService {
  private dialogRef;
  private url: string = "/employee/status";
  constructor(
    private dialog: MatDialog,
    private httpHelper: HttpHelperService
  ) {}
  getEmployeeStatus(
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
        const { data, count } = result;
        const newData = data.map(data => {
          data.employeeStatusTableHash = Date.now() + data.employeeStatusId;
          return data;
        });
        return {
          ...result,
          data: newData
        };
      })
    );
  }

  createEmployeeStatus(employeeStatus: EmployeeStatus) {
    return this.httpHelper.httpPost<CreateResponse>(this.url, employeeStatus);
  }

  updateEmployeeStatus(employeeStatus: EmployeeStatus) {
    const url = `${this.url}/${employeeStatus.employeeStatusId}`;

    return this.httpHelper.httpPut<UpdateResponse>(url, employeeStatus).pipe(
      map(result => {
        const { updatedData } = result;
        const newData = {
          ...updatedData,
          employeeStatusTableHash: employeeStatus.employeeStatusTableHash
        };
        return { ...result, updatedData: newData };
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
