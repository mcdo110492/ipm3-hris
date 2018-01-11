import { Action } from "@ngrx/store";
import { EmployeeGovernment } from "./../../models/employee-government.model";

export const LOAD_GOVERNMENT_INFO =
  "[EMPLOYEEDETAILSGOVERNMENT] LOAD GOVERNMENT INFO";
export const LOAD_GOVERNMENT_INFO_FAIL =
  "[EMPLOYEEDETAILSGOVERNMENT] LOAD GOVERNMENT INFO FAIL";
export const LOAD_GOVERNMENT_INFO_SUCCESS =
  "[EMPLOYEEDETAILSGOVERNMENT] LOAD GOVERNMENT INFO SUCCESS";

export class LoadGovernmentInfo implements Action {
  readonly type = LOAD_GOVERNMENT_INFO;
}

export class LoadGovernmentInfoSuccess implements Action {
  readonly type = LOAD_GOVERNMENT_INFO_SUCCESS;

  constructor(public payload: EmployeeGovernment) {}
}

export class LoadGovernmentInfoFail implements Action {
  readonly type = LOAD_GOVERNMENT_INFO_FAIL;

  constructor(public payload: any) {}
}

export const SAVE_GOVERNMENT_INFO =
  "[EMPLOYEEDETAILSGOVERNMENT] SAVE GOVERNMENT INFO";
export const SAVE_GOVERNMENT_INFO_FAIL =
  "[EMPLOYEEDETAILSGOVERNMENT] SAVE GOVERNMENT INFO FAIL";
export const SAVE_GOVERNMENT_INFO_SUCCESS =
  "[EMPLOYEEDETAILSGOVERNMENT] SAVE GOVERNMENT INFO SUCCESs";

export class SaveGovernmentInfo implements Action {
  readonly type = SAVE_GOVERNMENT_INFO;

  constructor(public payload: EmployeeGovernment) {}
}

export class SaveGovernmentFail implements Action {
  readonly type = SAVE_GOVERNMENT_INFO_FAIL;

  constructor(public payload: any) {}
}

export class SaveGovernmentSuccess implements Action {
  readonly type = SAVE_GOVERNMENT_INFO_SUCCESS;

  constructor(public payload: EmployeeGovernment) {}
}

export type GovernmentActions =
  | LoadGovernmentInfo
  | LoadGovernmentInfoFail
  | LoadGovernmentInfoSuccess
  | SaveGovernmentInfo
  | SaveGovernmentSuccess
  | SaveGovernmentFail;
