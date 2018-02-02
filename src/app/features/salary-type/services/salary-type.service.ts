import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { SalaryTypeFormComponent } from "./../components/salary-type-form/salary-type-form.component";

import { map } from "rxjs/operators";

import { HttpHelperService } from "@helper/services/http-helper.service";

import {
  SalaryType,
  DataResponse,
  CreateResponse,
  UpdateResponse
} from "./../models";

@Injectable()
export class SalaryTypeService {
  private dialogRef;
  private url: string = "/salary/types";
  constructor(
    private dialog: MatDialog,
    private httpHelper: HttpHelperService
  ) {}
  getSalaryType(
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
          data.salaryTypeTableHash = Date.now() + data.salaryTypeId;
          return data;
        });
        return { ...result, data: newData };
      })
    );
  }

  createSalaryType(data: SalaryType) {
    return this.httpHelper.httpPost<CreateResponse>(this.url, data);
  }

  updateSalaryType(data: SalaryType) {
    const url = `${this.url}/${data.salaryTypeId}`;

    return this.httpHelper.httpPut<UpdateResponse>(url, data).pipe(
      map(result => {
        const { updatedData } = result;

        const newData = {
          ...updatedData,
          salaryTypeTableHash: data.salaryTypeTableHash
        };
        return {
          ...result,
          updatedData: newData
        };
      })
    );
  }

  openForm() {
    this.dialogRef = this.dialog.open(SalaryTypeFormComponent, {
      width: "auto",
      disableClose: true
    });
  }

  closeForm() {
    this.dialogRef.close();
  }
}
