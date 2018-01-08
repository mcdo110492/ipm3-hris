import { Action } from "@ngrx/store";
import { SalaryType } from "./../../models/salary-type.model";

export const LOAD_SALARYTYPE = "[SALARYTYPE] LOAD SALARYTYPE";
export const LOAD_SALARYTYPE_FAIL = "[SALARYTYPE] LOAD SALARYTYPE FAIL";
export const LOAD_SALARYTYPE_SUCCESS = "[SALARYTYPE] LOAD SALARYTYPE SUCCESS";
export const CLEAR_ENTITIES_SALARYTYPE = "[SALARYTYPE] CLEAR ENTITIES SALARYTYPE";

export class LoadSalaryType implements Action {
    readonly type = LOAD_SALARYTYPE;
}

export class LoadSalaryTypeFail implements Action {
    readonly type = LOAD_SALARYTYPE_FAIL;
    constructor(public payload : any){}
}

export class LoadSalaryTypeSuccess implements Action {
    readonly type = LOAD_SALARYTYPE_SUCCESS;
    constructor(public payload : { data : SalaryType[], count : number }){}
}

export class ClearEntitiesSalaryType implements Action {
    readonly type = CLEAR_ENTITIES_SALARYTYPE;
}

export const CREATE_SALARYTYPE = "[SALARYTYPE] CREATE SALARYTYPE";
export const CREATE_SALARYTYPE_FAIL = "[SALARYTYPE] CREATE SALARYTYPE FAIL";
export const CREATE_SALARYTYPE_SUCCESS = "[SALARYTYPE] CREATE SALARYTYPE SUCCESS";

export class CreateSalaryType implements Action {
    readonly type = CREATE_SALARYTYPE;
    constructor(public payload : SalaryType){}
}

export class CreateSalaryTypeFail implements Action {
    readonly type = CREATE_SALARYTYPE_FAIL;
    constructor(public payload : any){}
}

export class CreateSalaryTypeSuccess implements Action {
    readonly type = CREATE_SALARYTYPE_SUCCESS;
}

export const UPDATE_SALARYTYPE = "[SALARYTYPE] UPDATE SALARYTYPE";
export const UPDATE_SALARYTYPE_FAIL = "[SALARYTYPE] UPDATE SALARYTYPE FAIL";
export const UPDATE_SALARYTYPE_SUCCESS = "[SALARYTYPE] UPDATE SALARYTYPE SUCCESS";

export class UpdateSalaryType implements Action {
    readonly type = UPDATE_SALARYTYPE;
    constructor(public payload : SalaryType){}
}

export class UpdateSalaryTypeFail implements Action {
    readonly type = UPDATE_SALARYTYPE_FAIL;
    constructor(public payload : any){}
}

export class UpdateSalaryTypeSuccess implements Action {
    readonly type = UPDATE_SALARYTYPE_SUCCESS;
    constructor(public payload : SalaryType){}
}

export const SELECT_SALARYTYPE = "[SALARYTYPE] SELECT SALARYTYPE";

export class SelectSalaryType implements Action {
    readonly type = SELECT_SALARYTYPE;
    constructor(public payload : number){}
}

export const SEARCH_SALARYTYPE = "[SALARYTYPE] SEARCH SALARYTYPE";

export class SearchSalaryType implements Action {
    readonly type = SEARCH_SALARYTYPE;

    constructor(public payload : string){}
}

export const PAGE_EVENT_SALARYTYPE = "[SALARYTYPE] PAGE EVENT SALARYTYPE";
export const SORT_EVENT_SALARYTYPE = "[SALARYTYPE] SORT EVENT SALARYTYPE";

export class PageEventSalaryType implements Action {
    readonly type = PAGE_EVENT_SALARYTYPE;

    constructor(public pageSize : number, public pageIndex : number  ){}
}

export class SortEventSalaryType implements Action {
    readonly type = SORT_EVENT_SALARYTYPE;

    constructor(public sortField : string, public sortDirection : string){}
}

export type SalaryTypeActions = LoadSalaryType
| LoadSalaryTypeFail
| LoadSalaryTypeSuccess
| ClearEntitiesSalaryType
| CreateSalaryType
| CreateSalaryTypeFail
| CreateSalaryTypeSuccess
| UpdateSalaryType
| UpdateSalaryTypeFail
| UpdateSalaryTypeSuccess
| SelectSalaryType
| SearchSalaryType
| PageEventSalaryType
| SortEventSalaryType;
