import { Action } from "@ngrx/store";
import { EmployeeRegister } from "@app/features/employee-register/models";

export const SAVE = "[EMPLOYEEREGISTER] SAVE";
export const SUBMIT = "[EMPLOYEEREGISTER] SUBMIT";
export const SUBMIT_SUCCESS = "[EMPLOYEEREGISTER] SUBMIT SUCCESS";
export const SUBMIT_FAIL = "[EMPLOYEEREGISTER] SUBMIT FAIL";

export class Save implements Action {
  readonly type = SAVE;
  constructor(public payload: EmployeeRegister) {}
}

export class Submit implements Action {
  readonly type = SUBMIT;
}

export class SubmitSuccess implements Action {
  readonly type = SUBMIT_SUCCESS;
}

export class SubmitFail implements Action {
  readonly type = SUBMIT_FAIL;
  constructor(public payload: any) {}
}

export type Actions = Save | Submit | SubmitSuccess | SubmitFail;
