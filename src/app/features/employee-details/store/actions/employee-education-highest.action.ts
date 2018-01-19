import { Action } from "@ngrx/store";
import { EmployeeEducationHighest } from "./../../models/employee-education-highest.model";

export const LOAD_EDUCATIONHIGHEST = "[EMPLOYEEDETAILS] LOAD EDUCATIONHIGHEST";
export const LOAD_EDUCATIONHIGHEST_FAIL =
  "[EMPLOYEEDETAILS] LOAD EDUCATIONHIGHEST FAIL";
export const LOAD_EDUCATIONHIGHEST_SUCCESS =
  "[EMPLOYEEDETAILS] LOAD EDUCATIONHIGHEST SUCCESS";
export const CLEAR_ENTITIES_EDUCATIONHIGHEST =
  "[EMPLOYEEDETAILS] CLEAR ENTITIES EDUCATIONHIGHEST";

export class LoadEducationHighest implements Action {
  readonly type = LOAD_EDUCATIONHIGHEST;
}

export class LoadEducationHighestFail implements Action {
  readonly type = LOAD_EDUCATIONHIGHEST_FAIL;
  constructor(public payload: any) {}
}

export class LoadEducationHighestSuccess implements Action {
  readonly type = LOAD_EDUCATIONHIGHEST_SUCCESS;
  constructor(public payload: EmployeeEducationHighest[]) {}
}

export class ClearEntitiesEducationHighest implements Action {
  readonly type = CLEAR_ENTITIES_EDUCATIONHIGHEST;
}

export const CREATE_EDUCATIONHIGHEST =
  "[EMPLOYEEDETAILS] CREATE EDUCATIONHIGHEST";
export const CREATE_EDUCATIONHIGHEST_FAIL =
  "[EMPLOYEEDETAILS] CREATE EDUCATIONHIGHEST FAIL";
export const CREATE_EDUCATIONHIGHEST_SUCCESS =
  "[EMPLOYEEDETAILS] CREATE EDUCATIONHIGHEST SUCCESS";

export class CreateEducationHighest implements Action {
  readonly type = CREATE_EDUCATIONHIGHEST;
  constructor(public payload: EmployeeEducationHighest) {}
}

export class CreateEducationHighestFail implements Action {
  readonly type = CREATE_EDUCATIONHIGHEST_FAIL;
  constructor(public payload: any) {}
}

export class CreateEducationHighestSuccess implements Action {
  readonly type = CREATE_EDUCATIONHIGHEST_SUCCESS;
  constructor(public payload: EmployeeEducationHighest) {}
}

export const UPDATE_EDUCATIONHIGHEST =
  "[EMPLOYEEDETAILS] UPDATE EDUCATIONHIGHEST";
export const UPDATE_EDUCATIONHIGHEST_FAIL =
  "[EMPLOYEEDETAILS] UPDATE EDUCATIONHIGHEST FAIL";
export const UPDATE_EDUCATIONHIGHEST_SUCCESS =
  "[EMPLOYEEDETAILS] UPDATE EDUCATIONHIGHEST SUCCESS";

export class UpdateEducationHighest implements Action {
  readonly type = UPDATE_EDUCATIONHIGHEST;
  constructor(public payload: EmployeeEducationHighest) {}
}

export class UpdateEducationHighestFail implements Action {
  readonly type = UPDATE_EDUCATIONHIGHEST_FAIL;
  constructor(public payload: any) {}
}

export class UpdateEducationHighestSuccess implements Action {
  readonly type = UPDATE_EDUCATIONHIGHEST_SUCCESS;
  constructor(public payload: EmployeeEducationHighest) {}
}

export const SELECT_EDUCATIONHIGHEST =
  "[EMPLOYEEDETAILS] SELECT EDUCATIONHIGHEST";

export class SelectEducationHighest implements Action {
  readonly type = SELECT_EDUCATIONHIGHEST;
  constructor(public payload: number) {}
}

export type EducationHighestActions =
  | LoadEducationHighest
  | LoadEducationHighestFail
  | LoadEducationHighestSuccess
  | ClearEntitiesEducationHighest
  | CreateEducationHighest
  | CreateEducationHighestFail
  | CreateEducationHighestSuccess
  | UpdateEducationHighest
  | UpdateEducationHighestFail
  | UpdateEducationHighestSuccess
  | SelectEducationHighest;
