import { Action } from "@ngrx/store";
import {
  UserManagementModel,
  UserManagemetResponse,
  UserMangementResetPassword,
  UserManagementChangeStatus
} from "./../../models/user-management.model";

export const LOAD_USERMANAGEMENT = "[USERMANAGEMENT] LOAD USERMANAGEMENT";
export const LOAD_USERMANAGEMENT_FAIL =
  "[USERMANAGEMENT] LOAD USERMANAGEMENT FAIL";
export const LOAD_USERMANAGEMENT_SUCCESS =
  "[USERMANAGEMENT] LOAD USERMANAGEMENT SUCCESS";
export const CLEAR_ENTITIES_USERMANAGEMENT =
  "[USERMANAGEMENT] CLEAR ENTITIES USERMANAGEMENT";

export class LoadUserManagement implements Action {
  readonly type = LOAD_USERMANAGEMENT;
}

export class LoadUserManagementFail implements Action {
  readonly type = LOAD_USERMANAGEMENT_FAIL;
  constructor(public payload: any) {}
}

export class LoadUserManagementSuccess implements Action {
  readonly type = LOAD_USERMANAGEMENT_SUCCESS;
  constructor(public payload: { data: UserManagementModel[]; count: number }) {}
}

export class ClearEntitiesUserManagement implements Action {
  readonly type = CLEAR_ENTITIES_USERMANAGEMENT;
}

export const CREATE_USERMANAGEMENT = "[USERMANAGEMENT] CREATE USERMANAGEMENT";
export const CREATE_USERMANAGEMENT_FAIL =
  "[USERMANAGEMENT] CREATE USERMANAGEMENT FAIL";
export const CREATE_USERMANAGEMENT_SUCCESS =
  "[USERMANAGEMENT] CREATE USERMANAGEMENT SUCCESS";

export class CreateUserManagement implements Action {
  readonly type = CREATE_USERMANAGEMENT;
  constructor(public payload: UserManagementModel) {}
}

export class CreateUserManagementFail implements Action {
  readonly type = CREATE_USERMANAGEMENT_FAIL;
  constructor(public payload: any) {}
}

export class CreateUserManagementSuccess implements Action {
  readonly type = CREATE_USERMANAGEMENT_SUCCESS;
  constructor(public payload: UserManagemetResponse) {}
}

export const SEARCH_USERMANAGEMENT = "[USERMANAGEMENT] SEARCH USERMANAGEMENT";

export class SearchUserManagement implements Action {
  readonly type = SEARCH_USERMANAGEMENT;

  constructor(public payload: string) {}
}

export const PAGE_EVENT_USERMANAGEMENT =
  "[USERMANAGEMENT] PAGE EVENT USERMANAGEMENT";
export const SORT_EVENT_USERMANAGEMENT =
  "[USERMANAGEMENT] SORT EVENT USERMANAGEMENT";

export class PageEventUserManagement implements Action {
  readonly type = PAGE_EVENT_USERMANAGEMENT;

  constructor(public pageSize: number, public pageIndex: number) {}
}

export class SortEventUserManagement implements Action {
  readonly type = SORT_EVENT_USERMANAGEMENT;

  constructor(public sortField: string, public sortDirection: string) {}
}

export const RESET_PASSWORD = "[USERMANAGEMENT] RESET PASSWORD USERMANAGEMENT";

export const CHANGE_STATUS = "[USERMANAGEMENT] CHANGE STATUS USERMANAGEMENT";

export const REQUEST_SUCCESS =
  "[USERMANAGEMENT] REQUEST SUCCESS USERMANAGEMENT";

export const REQUEST_FAIL = "[USERMANAGEMENT] REQUEST FAIL USERMANAGEMENT";

export class ResetPassword implements Action {
  readonly type = RESET_PASSWORD;

  constructor(public payload: UserMangementResetPassword) {}
}

export class ChangeStatus implements Action {
  readonly type = CHANGE_STATUS;
  constructor(public payload: UserManagementChangeStatus) {}
}

export class RequestSuccess implements Action {
  readonly type = REQUEST_SUCCESS;
  constructor(public payload: UserManagemetResponse) {}
}

export class RequestFail implements Action {
  readonly type = REQUEST_FAIL;
  constructor(public payload: any) {}
}

export type UserManagementActions =
  | LoadUserManagement
  | LoadUserManagementFail
  | LoadUserManagementSuccess
  | ClearEntitiesUserManagement
  | CreateUserManagement
  | CreateUserManagementFail
  | CreateUserManagementSuccess
  | SearchUserManagement
  | PageEventUserManagement
  | SortEventUserManagement
  | ResetPassword
  | ChangeStatus
  | RequestSuccess
  | RequestFail;
