import { Action } from "@ngrx/store";
import { Project } from "@features/project/models/project.model";

export const LOAD_ALL_PROJECT = "[CONTENT] LOAD ALL PROJECT";
export const LOAD_ALL_PROJECT_SUCCESS = "[CONTENT] LOAD ALL PROJECT SUCCESS";
export const LOAD_ALL_PROJECT_FAIL = "[CONTENT] LOAD ALL PROJECT FAIL";
export const SELECT_PROJECT = "[CONTENT] SELECT PROJECT";
export const ADD_PROJECT = "[CONTENT] ADD PROJECT";
export const UPDATE_PROJECT = "[CONTENT] UPDATE PROJECT";

export class LoadAllProject implements Action {
  readonly type = LOAD_ALL_PROJECT;
}

export class LoadAllProjectSuccess implements Action {
  readonly type = LOAD_ALL_PROJECT_SUCCESS;

  constructor(public payload: Project[]) {}
}

export class LoadAllProjectFail implements Action {
  readonly type = LOAD_ALL_PROJECT_FAIL;

  constructor(public payload: any) {}
}

export class SelectProject implements Action {
  readonly type = SELECT_PROJECT;

  constructor(public payload: number) {}
}

export class AddProject implements Action {
  readonly type = ADD_PROJECT;
  constructor(public payload: Project) {}
}

export class UpdateProject implements Action {
  readonly type = UPDATE_PROJECT;
  constructor(public payload: Project) {}
}

export type ProjectContentActions =
  | LoadAllProject
  | LoadAllProjectSuccess
  | LoadAllProjectFail
  | SelectProject
  | AddProject
  | UpdateProject;
