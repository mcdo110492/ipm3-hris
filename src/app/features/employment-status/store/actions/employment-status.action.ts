import { Action } from "@ngrx/store";
import { EmploymentStatus } from "./../../models/employment-status.model";

export const LOAD_EMPLOYMENTSTATUS = "[EMPLOYMENTSTATUS] LOAD EMPLOYMENTSTATUS";
export const LOAD_EMPLOYMENTSTATUS_FAIL =
  "[EMPLOYMENTSTATUS] LOAD EMPLOYMENTSTATUS FAIL";
export const LOAD_EMPLOYMENTSTATUS_SUCCESS =
  "[EMPLOYMENTSTATUS] LOAD EMPLOYMENTSTATUS SUCCESS";
export const CLEAR_ENTITIES_EMPLOYMENTSTATUS =
  "[EMPLOYMENTSTATUS] CLEAR ENTITIES EMPLOYMENTSTATUS";

export class LoadEmploymentStatus implements Action {
  readonly type = LOAD_EMPLOYMENTSTATUS;
}

export class LoadEmploymentStatusFail implements Action {
  readonly type = LOAD_EMPLOYMENTSTATUS_FAIL;
  constructor(public payload: any) {}
}

export class LoadEmploymentStatusSuccess implements Action {
  readonly type = LOAD_EMPLOYMENTSTATUS_SUCCESS;
  constructor(public payload: { data: EmploymentStatus[]; count: number }) {}
}

export class ClearEntitiesEmploymentStatus implements Action {
  readonly type = CLEAR_ENTITIES_EMPLOYMENTSTATUS;
}

export const CREATE_EMPLOYMENTSTATUS =
  "[EMPLOYMENTSTATUS] CREATE EMPLOYMENTSTATUS";
export const CREATE_EMPLOYMENTSTATUS_FAIL =
  "[EMPLOYMENTSTATUS] CREATE EMPLOYMENTSTATUS FAIL";
export const CREATE_EMPLOYMENTSTATUS_SUCCESS =
  "[EMPLOYMENTSTATUS] CREATE EMPLOYMENTSTATUS SUCCESS";

export class CreateEmploymentStatus implements Action {
  readonly type = CREATE_EMPLOYMENTSTATUS;
  constructor(public payload: EmploymentStatus) {}
}

export class CreateEmploymentStatusFail implements Action {
  readonly type = CREATE_EMPLOYMENTSTATUS_FAIL;
  constructor(public payload: any) {}
}

export class CreateEmploymentStatusSuccess implements Action {
  readonly type = CREATE_EMPLOYMENTSTATUS_SUCCESS;
}

export const UPDATE_EMPLOYMENTSTATUS =
  "[EMPLOYMENTSTATUS] UPDATE EMPLOYMENTSTATUS";
export const UPDATE_EMPLOYMENTSTATUS_FAIL =
  "[EMPLOYMENTSTATUS] UPDATE EMPLOYMENTSTATUS FAIL";
export const UPDATE_EMPLOYMENTSTATUS_SUCCESS =
  "[EMPLOYMENTSTATUS] UPDATE EMPLOYMENTSTATUS SUCCESS";

export class UpdateEmploymentStatus implements Action {
  readonly type = UPDATE_EMPLOYMENTSTATUS;
  constructor(public payload: EmploymentStatus) {}
}

export class UpdateEmploymentStatusFail implements Action {
  readonly type = UPDATE_EMPLOYMENTSTATUS_FAIL;
  constructor(public payload: any) {}
}

export class UpdateEmploymentStatusSuccess implements Action {
  readonly type = UPDATE_EMPLOYMENTSTATUS_SUCCESS;
  constructor(public payload: EmploymentStatus) {}
}

export const SELECT_EMPLOYMENTSTATUS =
  "[EMPLOYMENTSTATUS] SELECT EMPLOYMENTSTATUS";

export class SelectEmploymentStatus implements Action {
  readonly type = SELECT_EMPLOYMENTSTATUS;
  constructor(public payload: number) {}
}

export const SEARCH_EMPLOYMENTSTATUS =
  "[EMPLOYMENTSTATUS] SEARCH EMPLOYMENTSTATUS";

export class SearchEmploymentStatus implements Action {
  readonly type = SEARCH_EMPLOYMENTSTATUS;

  constructor(public payload: string) {}
}

export const PAGE_EVENT_EMPLOYMENTSTATUS =
  "[EMPLOYMENTSTATUS] PAGE EVENT EMPLOYMENTSTATUS";
export const SORT_EVENT_EMPLOYMENTSTATUS =
  "[EMPLOYMENTSTATUS] SORT EVENT EMPLOYMENTSTATUS";

export class PageEventEmploymentStatus implements Action {
  readonly type = PAGE_EVENT_EMPLOYMENTSTATUS;

  constructor(public pageSize: number, public pageIndex: number) {}
}

export class SortEventEmploymentStatus implements Action {
  readonly type = SORT_EVENT_EMPLOYMENTSTATUS;

  constructor(public sortField: string, public sortDirection: string) {}
}

export type EmploymentStatusActions =
  | LoadEmploymentStatus
  | LoadEmploymentStatusFail
  | LoadEmploymentStatusSuccess
  | ClearEntitiesEmploymentStatus
  | CreateEmploymentStatus
  | CreateEmploymentStatusFail
  | CreateEmploymentStatusSuccess
  | UpdateEmploymentStatus
  | UpdateEmploymentStatusFail
  | UpdateEmploymentStatusSuccess
  | SelectEmploymentStatus
  | SearchEmploymentStatus
  | PageEventEmploymentStatus
  | SortEventEmploymentStatus;
