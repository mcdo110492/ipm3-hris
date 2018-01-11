import { Action } from "@ngrx/store";
import { EmployeePersonal } from "./../../models/employee-personal.model";

export const LOAD_PERSONAL_INFO =
  "[EMPLOYEEDETAILSPERSONAL] LOAD PERSONAL INFO";
export const LOAD_PERSONAL_INFO_FAIL =
  "[EMPLOYEEDETAILSPERSONAL] LOAD PERSONAL INFO FAIL";
export const LOAD_PERSONAL_INFO_SUCCESS =
  "[EMPLOYEEDETAILSPERSONAL] LOAD PERSONAL INFO SUCCESS";

export class LoadPersonalInfo implements Action {
  readonly type = LOAD_PERSONAL_INFO;
}

export class LoadPersonalInfoSuccess implements Action {
  readonly type = LOAD_PERSONAL_INFO_SUCCESS;

  constructor(public payload: EmployeePersonal) {}
}

export class LoadPersonalInfoFail implements Action {
  readonly type = LOAD_PERSONAL_INFO_FAIL;

  constructor(public payload: any) {}
}

export const SAVE_PERSONAL_INFO =
  "[EMPLOYEEDETAILSPERSONAL] SAVE PERSONAL INFO";
export const SAVE_PERSONAL_INFO_FAIL =
  "[EMPLOYEEDETAILSPERSONAL] SAVE PERSONAL INFO FAIL";
export const SAVE_PERSONAL_INFO_SUCCESS =
  "[EMPLOYEEDETAILSPERSONAL] SAVE PERSONAL INFO SUCCESs";

export class SavePersonalInfo implements Action {
  readonly type = SAVE_PERSONAL_INFO;

  constructor(public payload: EmployeePersonal) {}
}

export class SavePersonalFail implements Action {
  readonly type = SAVE_PERSONAL_INFO_FAIL;

  constructor(public payload: any) {}
}

export class SavePersonalSuccess implements Action {
  readonly type = SAVE_PERSONAL_INFO_SUCCESS;

  constructor(public payload: EmployeePersonal) {}
}

export type Actions =
  | LoadPersonalInfo
  | LoadPersonalInfoFail
  | LoadPersonalInfoSuccess
  | SavePersonalInfo
  | SavePersonalSuccess
  | SavePersonalFail;
