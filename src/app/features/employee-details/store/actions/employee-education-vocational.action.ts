import { Action } from "@ngrx/store";
import { EmployeeEducationVocational } from "./../../models/employee-education-vocational.model";

export const LOAD_EDUCATIONVOCATIONAL =
  "[EMPLOYEEDETAILS] LOAD EDUCATIONVOCATIONAL";
export const LOAD_EDUCATIONVOCATIONAL_FAIL =
  "[EMPLOYEEDETAILS] LOAD EDUCATIONVOCATIONAL FAIL";
export const LOAD_EDUCATIONVOCATIONAL_SUCCESS =
  "[EMPLOYEEDETAILS] LOAD EDUCATIONVOCATIONAL SUCCESS";
export const CLEAR_ENTITIES_EDUCATIONVOCATIONAL =
  "[EMPLOYEEDETAILS] CLEAR ENTITIES EDUCATIONVOCATIONAL";

export class LoadEducationVocational implements Action {
  readonly type = LOAD_EDUCATIONVOCATIONAL;
}

export class LoadEducationVocationalFail implements Action {
  readonly type = LOAD_EDUCATIONVOCATIONAL_FAIL;
  constructor(public payload: any) {}
}

export class LoadEducationVocationalSuccess implements Action {
  readonly type = LOAD_EDUCATIONVOCATIONAL_SUCCESS;
  constructor(public payload: EmployeeEducationVocational[]) {}
}

export class ClearEntitiesEducationVocational implements Action {
  readonly type = CLEAR_ENTITIES_EDUCATIONVOCATIONAL;
}

export const CREATE_EDUCATIONVOCATIONAL =
  "[EMPLOYEEDETAILS] CREATE EDUCATIONVOCATIONAL";
export const CREATE_EDUCATIONVOCATIONAL_FAIL =
  "[EMPLOYEEDETAILS] CREATE EDUCATIONVOCATIONAL FAIL";
export const CREATE_EDUCATIONVOCATIONAL_SUCCESS =
  "[EMPLOYEEDETAILS] CREATE EDUCATIONVOCATIONAL SUCCESS";

export class CreateEducationVocational implements Action {
  readonly type = CREATE_EDUCATIONVOCATIONAL;
  constructor(public payload: EmployeeEducationVocational) {}
}

export class CreateEducationVocationalFail implements Action {
  readonly type = CREATE_EDUCATIONVOCATIONAL_FAIL;
  constructor(public payload: any) {}
}

export class CreateEducationVocationalSuccess implements Action {
  readonly type = CREATE_EDUCATIONVOCATIONAL_SUCCESS;
  constructor(public payload: EmployeeEducationVocational) {}
}

export const UPDATE_EDUCATIONVOCATIONAL =
  "[EMPLOYEEDETAILS] UPDATE EDUCATIONVOCATIONAL";
export const UPDATE_EDUCATIONVOCATIONAL_FAIL =
  "[EMPLOYEEDETAILS] UPDATE EDUCATIONVOCATIONAL FAIL";
export const UPDATE_EDUCATIONVOCATIONAL_SUCCESS =
  "[EMPLOYEEDETAILS] UPDATE EDUCATIONVOCATIONAL SUCCESS";

export class UpdateEducationVocational implements Action {
  readonly type = UPDATE_EDUCATIONVOCATIONAL;
  constructor(public payload: EmployeeEducationVocational) {}
}

export class UpdateEducationVocationalFail implements Action {
  readonly type = UPDATE_EDUCATIONVOCATIONAL_FAIL;
  constructor(public payload: any) {}
}

export class UpdateEducationVocationalSuccess implements Action {
  readonly type = UPDATE_EDUCATIONVOCATIONAL_SUCCESS;
  constructor(public payload: EmployeeEducationVocational) {}
}

export const SELECT_EDUCATIONVOCATIONAL =
  "[EMPLOYEEDETAILS] SELECT EDUCATIONVOCATIONAL";

export class SelectEducationVocational implements Action {
  readonly type = SELECT_EDUCATIONVOCATIONAL;
  constructor(public payload: number) {}
}

export type EducationVocationalActions =
  | LoadEducationVocational
  | LoadEducationVocationalFail
  | LoadEducationVocationalSuccess
  | ClearEntitiesEducationVocational
  | CreateEducationVocational
  | CreateEducationVocationalFail
  | CreateEducationVocationalSuccess
  | UpdateEducationVocational
  | UpdateEducationVocationalFail
  | UpdateEducationVocationalSuccess
  | SelectEducationVocational;
