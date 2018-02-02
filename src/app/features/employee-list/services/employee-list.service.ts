import { Injectable } from "@angular/core";

import { map } from "rxjs/operators";

import { HttpHelperService } from "@helper/services/http-helper.service";

import { EmployeeList, DataResponse } from "./../models";

@Injectable()
export class EmployeeListService {
  constructor(private httpHelper: HttpHelperService) {}

  loadEmployeeList(
    pageIndex: number,
    pageSize: number,
    sortField: string,
    sortDirection: string,
    searchQuery: string,
    project: number
  ) {
    const url = `/employee`;
    const page = (pageIndex + 1).toString();
    const params = {
      filter: searchQuery,
      field: sortField,
      order: sortDirection,
      limit: pageSize.toString(),
      page,
      project: project.toString()
    };
    return this.httpHelper.httpTableGet<DataResponse>(url, params).pipe(
      map(result => {
        const { data } = result;
        const newData = data.map(data => {
          data.employeeListTableHash = Date.now() + data.employeeId;
          return data;
        });
        return {
          ...result,
          data: newData
        };
      })
    );
  }
}
