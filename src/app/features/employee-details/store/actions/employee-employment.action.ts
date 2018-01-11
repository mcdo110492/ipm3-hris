import { Action } from "@ngrx/store";
import { EmployeeEmployment } from "./../../models/employee-employment.model";

export const LOAD_EMPLOYMENT_INFO =
  "[EMPLOYEEDETAILSEMPLOYMENT] LOAD EMPLOYMENT INFO";
export const LOAD_EMPLOYMENT_INFO_FAIL =
  "[EMPLOYEEDETAILSEMPLOYMENT] LOAD EMPLOYMENT INFO FAIL";
export const LOAD_EMPLOYMENT_INFO_SUCCESS =
  "[EMPLOYEEDETAILSEMPLOYMENT] LOAD EMPLOYMENT INFO SUCCESS";

export class LoadEmploymentInfo implements Action {
  readonly type = LOAD_EMPLOYMENT_INFO;
}

export class LoadEmploymentInfoSuccess implements Action {
  readonly type = LOAD_EMPLOYMENT_INFO_SUCCESS;

  constructor(public payload: EmployeeEmployment) {}
}

export class LoadEmploymentInfoFail implements Action {
  readonly type = LOAD_EMPLOYMENT_INFO_FAIL;

  constructor(public payload: any) {}
}

export const SAVE_EMPLOYMENT_INFO =
  "[EMPLOYEEDETAILSEMPLOYMENT] SAVE EMPLOYMENT INFO";
export const SAVE_EMPLOYMENT_INFO_FAIL =
  "[EMPLOYEEDETAILSEMPLOYMENT] SAVE EMPLOYMENT INFO FAIL";
export const SAVE_EMPLOYMENT_INFO_SUCCESS =
  "[EMPLOYEEDETAILSEMPLOYMENT] SAVE EMPLOYMENT INFO SUCCESs";

export class SaveEmploymentInfo implements Action {
  readonly type = SAVE_EMPLOYMENT_INFO;

  constructor(public payload: EmployeeEmployment) {}
}

export class SaveEmploymentFail implements Action {
  readonly type = SAVE_EMPLOYMENT_INFO_FAIL;

  constructor(public payload: any) {}
}

export class SaveEmploymentSuccess implements Action {
  readonly type = SAVE_EMPLOYMENT_INFO_SUCCESS;

  constructor(public payload: EmployeeEmployment) {}
}

export type EmploymentActions =
  | LoadEmploymentInfo
  | LoadEmploymentInfoFail
  | LoadEmploymentInfoSuccess
  | SaveEmploymentInfo
  | SaveEmploymentSuccess
  | SaveEmploymentFail;
