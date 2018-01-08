import { Action } from "@ngrx/store";
import { EmployeeList } from "./../../models/employee-list.model";

export const LOAD_EMPLOYEELIST = "[EMPLOYEELIST] LOAD EMPLOYEELIST";
export const LOAD_EMPLOYEELIST_FAIL = "[EMPLOYEELIST] LOAD EMPLOYEELIST FAIL";
export const LOAD_EMPLOYEELIST_SUCCESS =
  "[EMPLOYEELIST] LOAD EMPLOYEELIST SUCCESS";
export const CLEAR_ENTITIES_EMPLOYEELIST =
  "[EMPLOYEELIST] CLEAR ENTITIES EMPLOYEELIST";

export class LoadEmployeeList implements Action {
  readonly type = LOAD_EMPLOYEELIST;
}

export class LoadEmployeeListFail implements Action {
  readonly type = LOAD_EMPLOYEELIST_FAIL;
  constructor(public payload: any) {}
}

export class LoadEmployeeListSuccess implements Action {
  readonly type = LOAD_EMPLOYEELIST_SUCCESS;
  constructor(public payload: { data: EmployeeList[]; count: number }) {}
}

export class ClearEntitiesEmployeeList implements Action {
  readonly type = CLEAR_ENTITIES_EMPLOYEELIST;
}

export const SEARCH_EMPLOYEELIST = "[EMPLOYEELIST] SEARCH EMPLOYEELIST";

export class SearchEmployeeList implements Action {
  readonly type = SEARCH_EMPLOYEELIST;

  constructor(public payload: string) {}
}

export const PAGE_EVENT_EMPLOYEELIST = "[EMPLOYEELIST] PAGE EVENT EMPLOYEELIST";
export const SORT_EVENT_EMPLOYEELIST = "[EMPLOYEELIST] SORT EVENT EMPLOYEELIST";

export class PageEventEmployeeList implements Action {
  readonly type = PAGE_EVENT_EMPLOYEELIST;

  constructor(public pageSize: number, public pageIndex: number) {}
}

export class SortEventEmployeeList implements Action {
  readonly type = SORT_EVENT_EMPLOYEELIST;

  constructor(public sortField: string, public sortDirection: string) {}
}

export type EmployeeListActions =
  | LoadEmployeeList
  | LoadEmployeeListFail
  | LoadEmployeeListSuccess
  | ClearEntitiesEmployeeList
  | SearchEmployeeList
  | PageEventEmployeeList
  | SortEventEmployeeList;
