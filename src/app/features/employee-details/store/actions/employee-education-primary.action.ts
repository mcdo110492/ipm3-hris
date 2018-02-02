import { Action } from "@ngrx/store";
import { EmployeeEducationPrimary } from "./../../models/employee-education-primary.model";

export const LOAD_EDUCATIONPRIMARY_INFO =
  "[EMPLOYEEDETAILSEDUCATIONPRIMARY] LOAD EDUCATIONPRIMARY INFO";
export const LOAD_EDUCATIONPRIMARY_INFO_FAIL =
  "[EMPLOYEEDETAILSEDUCATIONPRIMARY] LOAD EDUCATIONPRIMARY INFO FAIL";
export const LOAD_EDUCATIONPRIMARY_INFO_SUCCESS =
  "[EMPLOYEEDETAILSEDUCATIONPRIMARY] LOAD EDUCATIONPRIMARY INFO SUCCESS";

export class LoadEducationPrimaryInfo implements Action {
  readonly type = LOAD_EDUCATIONPRIMARY_INFO;
}

export class LoadEducationPrimaryInfoSuccess implements Action {
  readonly type = LOAD_EDUCATIONPRIMARY_INFO_SUCCESS;

  constructor(public payload: EmployeeEducationPrimary) {}
}

export class LoadEducationPrimaryInfoFail implements Action {
  readonly type = LOAD_EDUCATIONPRIMARY_INFO_FAIL;

  constructor(public payload: any) {}
}

export const SAVE_EDUCATIONPRIMARY_INFO =
  "[EMPLOYEEDETAILSEDUCATIONPRIMARY] SAVE EDUCATIONPRIMARY INFO";
export const SAVE_EDUCATIONPRIMARY_INFO_FAIL =
  "[EMPLOYEEDETAILSEDUCATIONPRIMARY] SAVE EDUCATIONPRIMARY INFO FAIL";
export const SAVE_EDUCATIONPRIMARY_INFO_SUCCESS =
  "[EMPLOYEEDETAILSEDUCATIONPRIMARY] SAVE EDUCATIONPRIMARY INFO SUCCESs";

export class SaveEducationPrimaryInfo implements Action {
  readonly type = SAVE_EDUCATIONPRIMARY_INFO;

  constructor(public payload: EmployeeEducationPrimary) {}
}

export class SaveEducationPrimaryFail implements Action {
  readonly type = SAVE_EDUCATIONPRIMARY_INFO_FAIL;

  constructor(public payload: any) {}
}

export class SaveEducationPrimarySuccess implements Action {
  readonly type = SAVE_EDUCATIONPRIMARY_INFO_SUCCESS;
}

export type EducationPrimaryActions =
  | LoadEducationPrimaryInfo
  | LoadEducationPrimaryInfoFail
  | LoadEducationPrimaryInfoSuccess
  | SaveEducationPrimaryInfo
  | SaveEducationPrimarySuccess
  | SaveEducationPrimaryFail;
