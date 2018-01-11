import { Action } from "@ngrx/store";
import { EmployeeContact } from "./../../models/employee-contact.model";

export const LOAD_CONTACT_INFO = "[EMPLOYEEDETAILSCONTACT] LOAD CONTACT INFO";
export const LOAD_CONTACT_INFO_FAIL =
  "[EMPLOYEEDETAILSCONTACT] LOAD CONTACT INFO FAIL";
export const LOAD_CONTACT_INFO_SUCCESS =
  "[EMPLOYEEDETAILSCONTACT] LOAD CONTACT INFO SUCCESS";

export class LoadContactInfo implements Action {
  readonly type = LOAD_CONTACT_INFO;
}

export class LoadContactInfoSuccess implements Action {
  readonly type = LOAD_CONTACT_INFO_SUCCESS;

  constructor(public payload: EmployeeContact) {}
}

export class LoadContactInfoFail implements Action {
  readonly type = LOAD_CONTACT_INFO_FAIL;

  constructor(public payload: any) {}
}

export const SAVE_CONTACT_INFO = "[EMPLOYEEDETAILSCONTACT] SAVE CONTACT INFO";
export const SAVE_CONTACT_INFO_FAIL =
  "[EMPLOYEEDETAILSCONTACT] SAVE CONTACT INFO FAIL";
export const SAVE_CONTACT_INFO_SUCCESS =
  "[EMPLOYEEDETAILSCONTACT] SAVE CONTACT INFO SUCCESs";

export class SaveContactInfo implements Action {
  readonly type = SAVE_CONTACT_INFO;

  constructor(public payload: EmployeeContact) {}
}

export class SaveContactFail implements Action {
  readonly type = SAVE_CONTACT_INFO_FAIL;

  constructor(public payload: any) {}
}

export class SaveContactSuccess implements Action {
  readonly type = SAVE_CONTACT_INFO_SUCCESS;

  constructor(public payload: EmployeeContact) {}
}

export type ContactActions =
  | LoadContactInfo
  | LoadContactInfoFail
  | LoadContactInfoSuccess
  | SaveContactInfo
  | SaveContactSuccess
  | SaveContactFail;
