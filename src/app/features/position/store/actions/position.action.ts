import { Action } from "@ngrx/store";
import { Position } from "./../../models/position.model";

export const LOAD_POSITION = "[POSITION] LOAD POSITION";
export const LOAD_POSITION_FAIL = "[POSITION] LOAD POSITION FAIL";
export const LOAD_POSITION_SUCCESS = "[POSITION] LOAD POSITION SUCCESS";
export const CLEAR_ENTITIES_POSITION = "[POSITION] CLEAR ENTITIES POSITION";

export class LoadPosition implements Action {
    readonly type = LOAD_POSITION;
}

export class LoadPositionFail implements Action {
    readonly type = LOAD_POSITION_FAIL;
    constructor(public payload : any){}
}

export class LoadPositionSuccess implements Action {
    readonly type = LOAD_POSITION_SUCCESS;
    constructor(public payload : { data : Position[], count : number }){}
}

export class ClearEntitiesPosition implements Action {
    readonly type = CLEAR_ENTITIES_POSITION;
}

export const CREATE_POSITION = "[POSITION] CREATE POSITION";
export const CREATE_POSITION_FAIL = "[POSITION] CREATE POSITION FAIL";
export const CREATE_POSITION_SUCCESS = "[POSITION] CREATE POSITION SUCCESS";

export class CreatePosition implements Action {
    readonly type = CREATE_POSITION;
    constructor(public payload : Position){}
}

export class CreatePositionFail implements Action {
    readonly type = CREATE_POSITION_FAIL;
    constructor(public payload : any){}
}

export class CreatePositionSuccess implements Action {
    readonly type = CREATE_POSITION_SUCCESS;
}

export const UPDATE_POSITION = "[POSITION] UPDATE POSITION";
export const UPDATE_POSITION_FAIL = "[POSITION] UPDATE POSITION FAIL";
export const UPDATE_POSITION_SUCCESS = "[POSITION] UPDATE POSITION SUCCESS";

export class UpdatePosition implements Action {
    readonly type = UPDATE_POSITION;
    constructor(public payload : Position){}
}

export class UpdatePositionFail implements Action {
    readonly type = UPDATE_POSITION_FAIL;
    constructor(public payload : any){}
}

export class UpdatePositionSuccess implements Action {
    readonly type = UPDATE_POSITION_SUCCESS;
    constructor(public payload : Position){}
}

export const SELECT_POSITION = "[POSITION] SELECT POSITION";

export class SelectPosition implements Action {
    readonly type = SELECT_POSITION;
    constructor(public payload : number){}
}

export const SEARCH_POSITION = "[POSITION] SEARCH POSITION";

export class SearchPosition implements Action {
    readonly type = SEARCH_POSITION;

    constructor(public payload : string){}
}

export const PAGE_EVENT_POSITION = "[POSITION] PAGE EVENT POSITION";
export const SORT_EVENT_POSITION = "[POSITION] SORT EVENT POSITION";

export class PageEventPosition implements Action {
    readonly type = PAGE_EVENT_POSITION;

    constructor(public pageSize : number, public pageIndex : number  ){}
}

export class SortEventPosition implements Action {
    readonly type = SORT_EVENT_POSITION;

    constructor(public sortField : string, public sortDirection : string){}
}

export type PositionActions = LoadPosition
| LoadPositionFail
| LoadPositionSuccess
| ClearEntitiesPosition
| CreatePosition
| CreatePositionFail
| CreatePositionSuccess
| UpdatePosition
| UpdatePositionFail
| UpdatePositionSuccess
| SelectPosition
| SearchPosition
| PageEventPosition
| SortEventPosition;
