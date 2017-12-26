import { Action } from "@ngrx/store";
import { Project } from "./../../models/project.model";

export const LOAD_PROJECT = "[PROJECT] LOAD PROJECT";
export const LOAD_PROJECT_FAIL = "[PROJECT] LOAD PROJECT FAIL";
export const LOAD_PROJECT_SUCCESS = "[PROJECT] LOAD PROJECT SUCCESS";

export class LoadProject implements Action {
    readonly type = LOAD_PROJECT;
}

export class LoadProjectFail implements Action {
    readonly type = LOAD_PROJECT_FAIL;
    constructor(public payload : any){}
}

export class LoadProjectSuccess implements Action {
    readonly type = LOAD_PROJECT_SUCCESS;
    constructor(public payload : { data : Project[], count : number }){}
}

export const CREATE_PROJECT = "[PROJECT] CREATE PROJECT";
export const CREATE_PROJECT_FAIL = "[PROJECT] CREATE PROJECT FAIL";
export const CREATE_PROJECT_SUCCESS = "[PROJECT] CREATE PROJECT SUCCESS";

export class CreateProject implements Action {
    readonly type = CREATE_PROJECT;
    constructor(public payload : Project){}
}

export class CreateProjectFail implements Action {
    readonly type = CREATE_PROJECT_FAIL;
    constructor(public payload : any){}
}

export class CreateProjectSuccess implements Action {
    readonly type = CREATE_PROJECT_SUCCESS;
}

export const UPDATE_PROJECT = "[PROJECT] UPDATE PROJECT";
export const UPDATE_PROJECT_FAIL = "[PROJECT] UPDATE PROJECT FAIL";
export const UPDATE_PROJECT_SUCCESS = "[PROJECT] UPDATE PROJECT SUCCESS";

export class UpdateProject implements Action {
    readonly type = UPDATE_PROJECT;
    constructor(public payload : Project){}
}

export class UpdateProjectFail implements Action {
    readonly type = UPDATE_PROJECT_FAIL;
    constructor(public payload : any){}
}

export class UpdateProjectSuccess implements Action {
    readonly type = UPDATE_PROJECT_SUCCESS;
    constructor(public payload : Project){}
}

export const SELECT_PROJECT = "[PROJECT] SELECT PROJECT";

export class SelectProject implements Action {
    readonly type = SELECT_PROJECT;
    constructor(public payload : number){}
}

export const SEARCH_PROJECT = "[PROJECT] SEARCH PROJECT";

export class SearchProject implements Action {
    readonly type = SEARCH_PROJECT;

    constructor(public payload : string){}
}

export type ProjectActions = LoadProject
| LoadProjectFail
| LoadProjectSuccess
| CreateProject
| CreateProjectFail
| CreateProjectSuccess
| UpdateProject
| UpdateProjectFail
| UpdateProjectSuccess
| SelectProject
| SearchProject;
