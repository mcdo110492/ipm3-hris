import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";

import { map } from "rxjs/operators";

import { HttpHelperService } from "@app/helper/services";
import {
  UserManagementModel,
  UserManagemetResponse,
  UserMangementResetPassword,
  UserManagementChangeStatus,
  UserManagentDataResponse
} from "@app/features/user-management/models/user-management.model";
import { UserManagementFormComponent } from "@app/features/user-management/components/user-management-form/user-management-form.component";

@Injectable()
export class UserManagementService {
  private dialogRef;
  constructor(
    private _httpHelper: HttpHelperService,
    private dialog: MatDialog
  ) {}

  getUserManagement(
    pageIndex: number,
    pageSize: number,
    sortField: string,
    sortDirection: string,
    searchQuery: string,
    projectId: number
  ) {
    const url = "/user/get/list";
    const page = (pageIndex + 1).toString();
    const params = {
      filter: searchQuery,
      field: sortField,
      order: sortDirection,
      limit: pageSize.toString(),
      page,
      project: projectId.toString()
    };

    return this._httpHelper
      .httpTableGet<UserManagentDataResponse>(url, params)
      .pipe(
        map(result => {
          const { data, count } = result;
          const newData = data.map(result => {
            result.userManagementTableHash = Date.now() + result.userId;
            return result;
          });
          return {
            count,
            data: newData
          };
        })
      );
  }

  addUser(data: UserManagementModel) {
    const url = "/user/add";
    return this._httpHelper.httpPost<UserManagemetResponse>(url, data);
  }

  resetPassword(data: UserMangementResetPassword) {
    const url = "/user/reset/password";
    return this._httpHelper.httpPost<UserManagemetResponse>(url, data);
  }

  changeStatus(data: UserManagementChangeStatus) {
    const url = "/user/change/status";
    return this._httpHelper.httpPost<UserManagemetResponse>(url, data);
  }

  openForm() {
    this.dialogRef = this.dialog.open(UserManagementFormComponent, {
      width: "auto",
      disableClose: true
    });
  }

  closeForm() {
    this.dialogRef.close();
  }

  roleToString(role: number) {
    if (role == 2) {
      return "Hr Admin";
    }
  }
}
