import { Action } from "@ngrx/store";
import { EmployeeEducationTertiary } from "./../../models/employee-education-tertiary.model";

export const LOAD_EDUCATIONTERTIARY =
  "[EMPLOYEEDETAILS] LOAD EDUCATIONTERTIARY";
export const LOAD_EDUCATIONTERTIARY_FAIL =
  "[EMPLOYEEDETAILS] LOAD EDUCATIONTERTIARY FAIL";
export const LOAD_EDUCATIONTERTIARY_SUCCESS =
  "[EMPLOYEEDETAILS] LOAD EDUCATIONTERTIARY SUCCESS";
export const CLEAR_ENTITIES_EDUCATIONTERTIARY =
  "[EMPLOYEEDETAILS] CLEAR ENTITIES EDUCATIONTERTIARY";

export class LoadEducationTertiary implements Action {
  readonly type = LOAD_EDUCATIONTERTIARY;
}

export class LoadEducationTertiaryFail implements Action {
  readonly type = LOAD_EDUCATIONTERTIARY_FAIL;
  constructor(public payload: any) {}
}

export class LoadEducationTertiarySuccess implements Action {
  readonly type = LOAD_EDUCATIONTERTIARY_SUCCESS;
  constructor(public payload: EmployeeEducationTertiary[]) {}
}

export class ClearEntitiesEducationTertiary implements Action {
  readonly type = CLEAR_ENTITIES_EDUCATIONTERTIARY;
}

export const CREATE_EDUCATIONTERTIARY =
  "[EMPLOYEEDETAILS] CREATE EDUCATIONTERTIARY";
export const CREATE_EDUCATIONTERTIARY_FAIL =
  "[EMPLOYEEDETAILS] CREATE EDUCATIONTERTIARY FAIL";
export const CREATE_EDUCATIONTERTIARY_SUCCESS =
  "[EMPLOYEEDETAILS] CREATE EDUCATIONTERTIARY SUCCESS";

export class CreateEducationTertiary implements Action {
  readonly type = CREATE_EDUCATIONTERTIARY;
  constructor(public payload: EmployeeEducationTertiary) {}
}

export class CreateEducationTertiaryFail implements Action {
  readonly type = CREATE_EDUCATIONTERTIARY_FAIL;
  constructor(public payload: any) {}
}

export class CreateEducationTertiarySuccess implements Action {
  readonly type = CREATE_EDUCATIONTERTIARY_SUCCESS;
  constructor(public payload: EmployeeEducationTertiary) {}
}

export const UPDATE_EDUCATIONTERTIARY =
  "[EMPLOYEEDETAILS] UPDATE EDUCATIONTERTIARY";
export const UPDATE_EDUCATIONTERTIARY_FAIL =
  "[EMPLOYEEDETAILS] UPDATE EDUCATIONTERTIARY FAIL";
export const UPDATE_EDUCATIONTERTIARY_SUCCESS =
  "[EMPLOYEEDETAILS] UPDATE EDUCATIONTERTIARY SUCCESS";

export class UpdateEducationTertiary implements Action {
  readonly type = UPDATE_EDUCATIONTERTIARY;
  constructor(public payload: EmployeeEducationTertiary) {}
}

export class UpdateEducationTertiaryFail implements Action {
  readonly type = UPDATE_EDUCATIONTERTIARY_FAIL;
  constructor(public payload: any) {}
}

export class UpdateEducationTertiarySuccess implements Action {
  readonly type = UPDATE_EDUCATIONTERTIARY_SUCCESS;
  constructor(public payload: EmployeeEducationTertiary) {}
}

export const SELECT_EDUCATIONTERTIARY =
  "[EMPLOYEEDETAILS] SELECT EDUCATIONTERTIARY";

export class SelectEducationTertiary implements Action {
  readonly type = SELECT_EDUCATIONTERTIARY;
  constructor(public payload: number) {}
}

export type EducationTertiaryActions =
  | LoadEducationTertiary
  | LoadEducationTertiaryFail
  | LoadEducationTertiarySuccess
  | ClearEntitiesEducationTertiary
  | CreateEducationTertiary
  | CreateEducationTertiaryFail
  | CreateEducationTertiarySuccess
  | UpdateEducationTertiary
  | UpdateEducationTertiaryFail
  | UpdateEducationTertiarySuccess
  | SelectEducationTertiary;
