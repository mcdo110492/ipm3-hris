import { Action } from "@ngrx/store";
import { EmployeeStatus } from "./../../models/employee-status.model";

export const LOAD_EMPLOYEESTATUS = "[EMPLOYEESTATUS] LOAD EMPLOYEESTATUS";
export const LOAD_EMPLOYEESTATUS_FAIL = "[EMPLOYEESTATUS] LOAD EMPLOYEESTATUS FAIL";
export const LOAD_EMPLOYEESTATUS_SUCCESS = "[EMPLOYEESTATUS] LOAD EMPLOYEESTATUS SUCCESS";
export const CLEAR_ENTITIES_EMPLOYEESTATUS = "[EMPLOYEESTATUS] CLEAR ENTITIES EMPLOYEESTATUS";

export class LoadEmployeeStatus implements Action {
    readonly type = LOAD_EMPLOYEESTATUS;
}

export class LoadEmployeeStatusFail implements Action {
    readonly type = LOAD_EMPLOYEESTATUS_FAIL;
    constructor(public payload : any){}
}

export class LoadEmployeeStatusSuccess implements Action {
    readonly type = LOAD_EMPLOYEESTATUS_SUCCESS;
    constructor(public payload : { data : EmployeeStatus[], count : number }){}
}

export class ClearEntitiesEmployeeStatus implements Action {
    readonly type = CLEAR_ENTITIES_EMPLOYEESTATUS;
}

export const CREATE_EMPLOYEESTATUS = "[EMPLOYEESTATUS] CREATE EMPLOYEESTATUS";
export const CREATE_EMPLOYEESTATUS_FAIL = "[EMPLOYEESTATUS] CREATE EMPLOYEESTATUS FAIL";
export const CREATE_EMPLOYEESTATUS_SUCCESS = "[EMPLOYEESTATUS] CREATE EMPLOYEESTATUS SUCCESS";

export class CreateEmployeeStatus implements Action {
    readonly type = CREATE_EMPLOYEESTATUS;
    constructor(public payload : EmployeeStatus){}
}

export class CreateEmployeeStatusFail implements Action {
    readonly type = CREATE_EMPLOYEESTATUS_FAIL;
    constructor(public payload : any){}
}

export class CreateEmployeeStatusSuccess implements Action {
    readonly type = CREATE_EMPLOYEESTATUS_SUCCESS;
}

export const UPDATE_EMPLOYEESTATUS = "[EMPLOYEESTATUS] UPDATE EMPLOYEESTATUS";
export const UPDATE_EMPLOYEESTATUS_FAIL = "[EMPLOYEESTATUS] UPDATE EMPLOYEESTATUS FAIL";
export const UPDATE_EMPLOYEESTATUS_SUCCESS = "[EMPLOYEESTATUS] UPDATE EMPLOYEESTATUS SUCCESS";

export class UpdateEmployeeStatus implements Action {
    readonly type = UPDATE_EMPLOYEESTATUS;
    constructor(public payload : EmployeeStatus){}
}

export class UpdateEmployeeStatusFail implements Action {
    readonly type = UPDATE_EMPLOYEESTATUS_FAIL;
    constructor(public payload : any){}
}

export class UpdateEmployeeStatusSuccess implements Action {
    readonly type = UPDATE_EMPLOYEESTATUS_SUCCESS;
    constructor(public payload : EmployeeStatus){}
}

export const SELECT_EMPLOYEESTATUS = "[EMPLOYEESTATUS] SELECT EMPLOYEESTATUS";

export class SelectEmployeeStatus implements Action {
    readonly type = SELECT_EMPLOYEESTATUS;
    constructor(public payload : number){}
}

export const SEARCH_EMPLOYEESTATUS = "[EMPLOYEESTATUS] SEARCH EMPLOYEESTATUS";

export class SearchEmployeeStatus implements Action {
    readonly type = SEARCH_EMPLOYEESTATUS;

    constructor(public payload : string){}
}

export const PAGE_EVENT_EMPLOYEESTATUS = "[EMPLOYEESTATUS] PAGE EVENT EMPLOYEESTATUS";
export const SORT_EVENT_EMPLOYEESTATUS = "[EMPLOYEESTATUS] SORT EVENT EMPLOYEESTATUS";

export class PageEventEmployeeStatus implements Action {
    readonly type = PAGE_EVENT_EMPLOYEESTATUS;

    constructor(public pageSize : number, public pageIndex : number  ){}
}

export class SortEventEmployeeStatus implements Action {
    readonly type = SORT_EVENT_EMPLOYEESTATUS;

    constructor(public sortField : string, public sortDirection : string){}
}

export type EmployeeStatusActions = LoadEmployeeStatus
| LoadEmployeeStatusFail
| LoadEmployeeStatusSuccess
| ClearEntitiesEmployeeStatus
| CreateEmployeeStatus
| CreateEmployeeStatusFail
| CreateEmployeeStatusSuccess
| UpdateEmployeeStatus
| UpdateEmployeeStatusFail
| UpdateEmployeeStatusSuccess
| SelectEmployeeStatus
| SearchEmployeeStatus
| PageEventEmployeeStatus
| SortEventEmployeeStatus;
