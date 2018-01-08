import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { map } from "rxjs/operators";

import { environment } from "@env/environment";

import { EmployeeList, DataResponse } from "./../models";

@Injectable()
export class EmployeeListService {
  private restEndPoint: string = environment.restEndPoint;
  constructor(private http: HttpClient) {}

  loadEmployeeList(
    pageIndex: number,
    pageSize: number,
    sortField: string,
    sortDirection: string,
    searchQuery: string,
    project: number
  ) {
    const params = new HttpParams()
      .set("filter", searchQuery)
      .append("field", sortField)
      .append("limit", pageSize.toString())
      .append("page", (pageIndex + 1).toString())
      .append("order", sortDirection)
      .append("projectId", project.toString());

    return this.http
      .get<DataResponse>(`${this.restEndPoint}/employee`, {
        params
      })
      .pipe(
        map(result => {
          const { data, count } = result;
          const newData = data.map(data => {
            data.employeeListTableHash = Date.now() + data.employeeId;
            return data;
          });
          return {
            count,
            data: newData
          };
        })
      );
  }
}
