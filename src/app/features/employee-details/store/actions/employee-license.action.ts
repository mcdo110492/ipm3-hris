import { Action } from "@ngrx/store";
import { EmployeeLicense } from "./../../models/employee-license.model";

export const LOAD_LICENSE = "[EMPLOYEEDETAILS] LOAD LICENSE";
export const LOAD_LICENSE_FAIL = "[EMPLOYEEDETAILS] LOAD LICENSE FAIL";
export const LOAD_LICENSE_SUCCESS = "[EMPLOYEEDETAILS] LOAD LICENSE SUCCESS";
export const CLEAR_ENTITIES_LICENSE =
  "[EMPLOYEEDETAILS] CLEAR ENTITIES LICENSE";

export class LoadLicense implements Action {
  readonly type = LOAD_LICENSE;
}

export class LoadLicenseFail implements Action {
  readonly type = LOAD_LICENSE_FAIL;
  constructor(public payload: any) {}
}

export class LoadLicenseSuccess implements Action {
  readonly type = LOAD_LICENSE_SUCCESS;
  constructor(public payload: EmployeeLicense[]) {}
}

export class ClearEntitiesLicense implements Action {
  readonly type = CLEAR_ENTITIES_LICENSE;
}

export const CREATE_LICENSE = "[EMPLOYEEDETAILS] CREATE LICENSE";
export const CREATE_LICENSE_FAIL = "[EMPLOYEEDETAILS] CREATE LICENSE FAIL";
export const CREATE_LICENSE_SUCCESS =
  "[EMPLOYEEDETAILS] CREATE LICENSE SUCCESS";

export class CreateLicense implements Action {
  readonly type = CREATE_LICENSE;
  constructor(public payload: EmployeeLicense) {}
}

export class CreateLicenseFail implements Action {
  readonly type = CREATE_LICENSE_FAIL;
  constructor(public payload: any) {}
}

export class CreateLicenseSuccess implements Action {
  readonly type = CREATE_LICENSE_SUCCESS;
  constructor(public payload: EmployeeLicense) {}
}

export const UPDATE_LICENSE = "[EMPLOYEEDETAILS] UPDATE LICENSE";
export const UPDATE_LICENSE_FAIL = "[EMPLOYEEDETAILS] UPDATE LICENSE FAIL";
export const UPDATE_LICENSE_SUCCESS =
  "[EMPLOYEEDETAILS] UPDATE LICENSE SUCCESS";

export class UpdateLicense implements Action {
  readonly type = UPDATE_LICENSE;
  constructor(public payload: EmployeeLicense) {}
}

export class UpdateLicenseFail implements Action {
  readonly type = UPDATE_LICENSE_FAIL;
  constructor(public payload: any) {}
}

export class UpdateLicenseSuccess implements Action {
  readonly type = UPDATE_LICENSE_SUCCESS;
  constructor(public payload: EmployeeLicense) {}
}

export const SELECT_LICENSE = "[EMPLOYEEDETAILS] SELECT LICENSE";

export class SelectLicense implements Action {
  readonly type = SELECT_LICENSE;
  constructor(public payload: number) {}
}

export type LicenseActions =
  | LoadLicense
  | LoadLicenseFail
  | LoadLicenseSuccess
  | ClearEntitiesLicense
  | CreateLicense
  | CreateLicenseFail
  | CreateLicenseSuccess
  | UpdateLicense
  | UpdateLicenseFail
  | UpdateLicenseSuccess
  | SelectLicense;
