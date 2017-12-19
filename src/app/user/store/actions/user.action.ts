import { Action } from "@ngrx/store";
import { User } from "./../../models/user.model";

export const SET_USER = "[USER] SET USER";
export const LOGOUT_USER = "[] LOGOUT USER";

export class SetUser implements Action {
  readonly type = SET_USER;
  constructor(public payload: User) {}
}

export class LogoutUser implements Action {
  readonly type = LOGOUT_USER;
}

export type UserActions = SetUser | LogoutUser;
