import { Action } from "@ngrx/store";
import { EmployeeEducationSecondary } from "./../../models/employee-education-secondary.model";

export const LOAD_EDUCATIONSECONDARY_INFO =
  "[EMPLOYEEDETAILSEDUCATIONSECONDARY] LOAD EDUCATIONSECONDARY INFO";
export const LOAD_EDUCATIONSECONDARY_INFO_FAIL =
  "[EMPLOYEEDETAILSEDUCATIONSECONDARY] LOAD EDUCATIONSECONDARY INFO FAIL";
export const LOAD_EDUCATIONSECONDARY_INFO_SUCCESS =
  "[EMPLOYEEDETAILSEDUCATIONSECONDARY] LOAD EDUCATIONSECONDARY INFO SUCCESS";

export class LoadEducationSecondaryInfo implements Action {
  readonly type = LOAD_EDUCATIONSECONDARY_INFO;
}

export class LoadEducationSecondaryInfoSuccess implements Action {
  readonly type = LOAD_EDUCATIONSECONDARY_INFO_SUCCESS;

  constructor(public payload: EmployeeEducationSecondary) {}
}

export class LoadEducationSecondaryInfoFail implements Action {
  readonly type = LOAD_EDUCATIONSECONDARY_INFO_FAIL;

  constructor(public payload: any) {}
}

export const SAVE_EDUCATIONSECONDARY_INFO =
  "[EMPLOYEEDETAILSEDUCATIONSECONDARY] SAVE EDUCATIONSECONDARY INFO";
export const SAVE_EDUCATIONSECONDARY_INFO_FAIL =
  "[EMPLOYEEDETAILSEDUCATIONSECONDARY] SAVE EDUCATIONSECONDARY INFO FAIL";
export const SAVE_EDUCATIONSECONDARY_INFO_SUCCESS =
  "[EMPLOYEEDETAILSEDUCATIONSECONDARY] SAVE EDUCATIONSECONDARY INFO SUCCESs";

export class SaveEducationSecondaryInfo implements Action {
  readonly type = SAVE_EDUCATIONSECONDARY_INFO;

  constructor(public payload: EmployeeEducationSecondary) {}
}

export class SaveEducationSecondaryFail implements Action {
  readonly type = SAVE_EDUCATIONSECONDARY_INFO_FAIL;

  constructor(public payload: any) {}
}

export class SaveEducationSecondarySuccess implements Action {
  readonly type = SAVE_EDUCATIONSECONDARY_INFO_SUCCESS;
}

export type EducationSecondaryActions =
  | LoadEducationSecondaryInfo
  | LoadEducationSecondaryInfoFail
  | LoadEducationSecondaryInfoSuccess
  | SaveEducationSecondaryInfo
  | SaveEducationSecondarySuccess
  | SaveEducationSecondaryFail;
