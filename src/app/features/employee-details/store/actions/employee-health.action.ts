import { Action } from "@ngrx/store";
import { EmployeeHealth } from "./../../models/employee-health.model";

export const LOAD_HEALTH_INFO = "[EMPLOYEEDETAILSHEALTH] LOAD HEALTH INFO";
export const LOAD_HEALTH_INFO_FAIL =
  "[EMPLOYEEDETAILSHEALTH] LOAD HEALTH INFO FAIL";
export const LOAD_HEALTH_INFO_SUCCESS =
  "[EMPLOYEEDETAILSHEALTH] LOAD HEALTH INFO SUCCESS";

export class LoadHealthInfo implements Action {
  readonly type = LOAD_HEALTH_INFO;
}

export class LoadHealthInfoSuccess implements Action {
  readonly type = LOAD_HEALTH_INFO_SUCCESS;

  constructor(public payload: EmployeeHealth) {}
}

export class LoadHealthInfoFail implements Action {
  readonly type = LOAD_HEALTH_INFO_FAIL;

  constructor(public payload: any) {}
}

export const SAVE_HEALTH_INFO = "[EMPLOYEEDETAILSHEALTH] SAVE HEALTH INFO";
export const SAVE_HEALTH_INFO_FAIL =
  "[EMPLOYEEDETAILSHEALTH] SAVE HEALTH INFO FAIL";
export const SAVE_HEALTH_INFO_SUCCESS =
  "[EMPLOYEEDETAILSHEALTH] SAVE HEALTH INFO SUCCESs";

export class SaveHealthInfo implements Action {
  readonly type = SAVE_HEALTH_INFO;

  constructor(public payload: EmployeeHealth) {}
}

export class SaveHealthFail implements Action {
  readonly type = SAVE_HEALTH_INFO_FAIL;

  constructor(public payload: any) {}
}

export class SaveHealthSuccess implements Action {
  readonly type = SAVE_HEALTH_INFO_SUCCESS;

  constructor(public payload: EmployeeHealth) {}
}

export type HealthActions =
  | LoadHealthInfo
  | LoadHealthInfoFail
  | LoadHealthInfoSuccess
  | SaveHealthInfo
  | SaveHealthSuccess
  | SaveHealthFail;
