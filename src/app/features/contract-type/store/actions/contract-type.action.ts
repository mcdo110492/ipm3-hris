import { Action } from "@ngrx/store";
import { ContractType } from "./../../models/contract-type.model";

export const LOAD_CONTRACTTYPE = "[CONTRACTTYPE] LOAD CONTRACTTYPE";
export const LOAD_CONTRACTTYPE_FAIL = "[CONTRACTTYPE] LOAD CONTRACTTYPE FAIL";
export const LOAD_CONTRACTTYPE_SUCCESS = "[CONTRACTTYPE] LOAD CONTRACTTYPE SUCCESS";
export const CLEAR_ENTITIES_CONTRACTTYPE = "[CONTRACTTYPE] CLEAR ENTITIES CONTRACTTYPE";

export class LoadContractType implements Action {
    readonly type = LOAD_CONTRACTTYPE;
}

export class LoadContractTypeFail implements Action {
    readonly type = LOAD_CONTRACTTYPE_FAIL;
    constructor(public payload : any){}
}

export class LoadContractTypeSuccess implements Action {
    readonly type = LOAD_CONTRACTTYPE_SUCCESS;
    constructor(public payload : { data : ContractType[], count : number }){}
}

export class ClearEntitiesContractType implements Action {
    readonly type = CLEAR_ENTITIES_CONTRACTTYPE;
}

export const CREATE_CONTRACTTYPE = "[CONTRACTTYPE] CREATE CONTRACTTYPE";
export const CREATE_CONTRACTTYPE_FAIL = "[CONTRACTTYPE] CREATE CONTRACTTYPE FAIL";
export const CREATE_CONTRACTTYPE_SUCCESS = "[CONTRACTTYPE] CREATE CONTRACTTYPE SUCCESS";

export class CreateContractType implements Action {
    readonly type = CREATE_CONTRACTTYPE;
    constructor(public payload : ContractType){}
}

export class CreateContractTypeFail implements Action {
    readonly type = CREATE_CONTRACTTYPE_FAIL;
    constructor(public payload : any){}
}

export class CreateContractTypeSuccess implements Action {
    readonly type = CREATE_CONTRACTTYPE_SUCCESS;
}

export const UPDATE_CONTRACTTYPE = "[CONTRACTTYPE] UPDATE CONTRACTTYPE";
export const UPDATE_CONTRACTTYPE_FAIL = "[CONTRACTTYPE] UPDATE CONTRACTTYPE FAIL";
export const UPDATE_CONTRACTTYPE_SUCCESS = "[CONTRACTTYPE] UPDATE CONTRACTTYPE SUCCESS";

export class UpdateContractType implements Action {
    readonly type = UPDATE_CONTRACTTYPE;
    constructor(public payload : ContractType){}
}

export class UpdateContractTypeFail implements Action {
    readonly type = UPDATE_CONTRACTTYPE_FAIL;
    constructor(public payload : any){}
}

export class UpdateContractTypeSuccess implements Action {
    readonly type = UPDATE_CONTRACTTYPE_SUCCESS;
    constructor(public payload : ContractType){}
}

export const SELECT_CONTRACTTYPE = "[CONTRACTTYPE] SELECT CONTRACTTYPE";

export class SelectContractType implements Action {
    readonly type = SELECT_CONTRACTTYPE;
    constructor(public payload : number){}
}

export const SEARCH_CONTRACTTYPE = "[CONTRACTTYPE] SEARCH CONTRACTTYPE";

export class SearchContractType implements Action {
    readonly type = SEARCH_CONTRACTTYPE;

    constructor(public payload : string){}
}

export const PAGE_EVENT_CONTRACTTYPE = "[CONTRACTTYPE] PAGE EVENT CONTRACTTYPE";
export const SORT_EVENT_CONTRACTTYPE = "[CONTRACTTYPE] SORT EVENT CONTRACTTYPE";

export class PageEventContractType implements Action {
    readonly type = PAGE_EVENT_CONTRACTTYPE;

    constructor(public pageSize : number, public pageIndex : number  ){}
}

export class SortEventContractType implements Action {
    readonly type = SORT_EVENT_CONTRACTTYPE;

    constructor(public sortField : string, public sortDirection : string){}
}

export type ContractTypeActions = LoadContractType
| LoadContractTypeFail
| LoadContractTypeSuccess
| ClearEntitiesContractType
| CreateContractType
| CreateContractTypeFail
| CreateContractTypeSuccess
| UpdateContractType
| UpdateContractTypeFail
| UpdateContractTypeSuccess
| SelectContractType
| SearchContractType
| PageEventContractType
| SortEventContractType;
