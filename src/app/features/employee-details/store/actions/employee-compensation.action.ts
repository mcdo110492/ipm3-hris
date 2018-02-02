import { Action } from "@ngrx/store";
import { EmployeeCompensation } from "./../../models/employee-compensation.model";

export const LOAD_COMPENSATION = "[EMPLOYEEDETAILS] LOAD COMPENSATION";
export const LOAD_COMPENSATION_FAIL =
  "[EMPLOYEEDETAILS] LOAD COMPENSATION FAIL";
export const LOAD_COMPENSATION_SUCCESS =
  "[EMPLOYEEDETAILS] LOAD COMPENSATION SUCCESS";
export const CLEAR_ENTITIES_COMPENSATION =
  "[EMPLOYEEDETAILS] CLEAR ENTITIES COMPENSATION";

export class LoadCompensation implements Action {
  readonly type = LOAD_COMPENSATION;
}

export class LoadCompensationFail implements Action {
  readonly type = LOAD_COMPENSATION_FAIL;
  constructor(public payload: any) {}
}

export class LoadCompensationSuccess implements Action {
  readonly type = LOAD_COMPENSATION_SUCCESS;
  constructor(public payload: EmployeeCompensation[]) {}
}

export class ClearEntitiesCompensation implements Action {
  readonly type = CLEAR_ENTITIES_COMPENSATION;
}

export const CREATE_COMPENSATION = "[EMPLOYEEDETAILS] CREATE COMPENSATION";
export const CREATE_COMPENSATION_FAIL =
  "[EMPLOYEEDETAILS] CREATE COMPENSATION FAIL";
export const CREATE_COMPENSATION_SUCCESS =
  "[EMPLOYEEDETAILS] CREATE COMPENSATION SUCCESS";

export class CreateCompensation implements Action {
  readonly type = CREATE_COMPENSATION;
  constructor(public payload: EmployeeCompensation) {}
}

export class CreateCompensationFail implements Action {
  readonly type = CREATE_COMPENSATION_FAIL;
  constructor(public payload: any) {}
}

export class CreateCompensationSuccess implements Action {
  readonly type = CREATE_COMPENSATION_SUCCESS;
  constructor(public payload: EmployeeCompensation) {}
}

export const UPDATE_COMPENSATION = "[EMPLOYEEDETAILS] UPDATE COMPENSATION";
export const UPDATE_COMPENSATION_FAIL =
  "[EMPLOYEEDETAILS] UPDATE COMPENSATION FAIL";
export const UPDATE_COMPENSATION_SUCCESS =
  "[EMPLOYEEDETAILS] UPDATE COMPENSATION SUCCESS";

export class UpdateCompensation implements Action {
  readonly type = UPDATE_COMPENSATION;
  constructor(public payload: EmployeeCompensation) {}
}

export class UpdateCompensationFail implements Action {
  readonly type = UPDATE_COMPENSATION_FAIL;
  constructor(public payload: any) {}
}

export class UpdateCompensationSuccess implements Action {
  readonly type = UPDATE_COMPENSATION_SUCCESS;
  constructor(public payload: EmployeeCompensation) {}
}

export const SELECT_COMPENSATION = "[EMPLOYEEDETAILS] SELECT COMPENSATION";

export class SelectCompensation implements Action {
  readonly type = SELECT_COMPENSATION;
  constructor(public payload: number) {}
}

export type CompensationActions =
  | LoadCompensation
  | LoadCompensationFail
  | LoadCompensationSuccess
  | ClearEntitiesCompensation
  | CreateCompensation
  | CreateCompensationFail
  | CreateCompensationSuccess
  | UpdateCompensation
  | UpdateCompensationFail
  | UpdateCompensationSuccess
  | SelectCompensation;
