import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material/dialog";
import { SalaryTypeFormComponent } from "./../components/salary-type-form/salary-type-form.component";

import { map } from "rxjs/operators";

import { environment } from "@env/environment";

import {
  SalaryType,
  DataResponse,
  CreateResponse,
  UpdateResponse
} from "./../models";

@Injectable()
export class SalaryTypeService {
  private restEndPoint: string = environment.restEndPoint;
  private dialogRef;
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  getSalaryType(
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
      .get<DataResponse>(`${this.restEndPoint}/salary/types`, {
        params
      })
      .pipe(
        map(result => {
          const { data, count } = result;
          const newData = data.map(data => {
            data.salaryTypeTableHash = Date.now() + data.salaryTypeId;
            return data;
          });
          return {
            count,
            data: newData
          };
        })
      );
  }

  createSalaryType(data: SalaryType) {
    return this.http.post<CreateResponse>(
      `${this.restEndPoint}/salary/types`,
      data
    );
  }

  updateSalaryType(data: SalaryType) {
    return this.http
      .put<UpdateResponse>(
        `${this.restEndPoint}/salary/types/${data.salaryTypeId}`,
        data
      )
      .pipe(
        map(result => {
          const {
            salaryTypeId,
            salaryTypeCode,
            salaryTypeName,
            created_at,
            updated_at
          } = result.updatedData;
          const updatedData: SalaryType = {
            salaryTypeId,
            salaryTypeCode,
            salaryTypeName,
            salaryTypeTableHash: data.salaryTypeTableHash,
            created_at,
            updated_at
          };
          return {
            updatedData
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
