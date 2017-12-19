import { Action } from "@ngrx/store";
import { Login, LoginResponse } from "./../../models/login.model";

export const LOGIN_CREDENTIALS = "[LOGIN] LOGIN CREDENTIALS";
export const LOGIN_FAIL = "[LOGIN] LOGIN FAIL";
export const LOGIN_SUCCESS = "[LOGIN] LOGIN SUCCESS";

export class LoginCredentials implements Action {
  readonly type = LOGIN_CREDENTIALS;
  constructor(public payload: Login) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: LoginResponse) {}
}

export type LoginActions = LoginCredentials | LoginFail | LoginSuccess;
