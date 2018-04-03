import { Action } from "@ngrx/store";
import { User } from "./../../models/user.model";

export const SET_USER = "[USER] SET USER";
export const LOGOUT_USER = "[USER] LOGOUT USER";

export class SetUser implements Action {
  readonly type = SET_USER;
  constructor(public payload: User) {}
}

export class LogoutUser implements Action {
  readonly type = LOGOUT_USER;
}

export const CHANGE_PROFILE_PHOTO = "[USER] CHANGE PROFILE PHOTO";

export class ChangeProfilePhoto implements Action {
  readonly type = CHANGE_PROFILE_PHOTO;
  constructor(public payload: string) {}
}

export type UserActions = SetUser | LogoutUser | ChangeProfilePhoto;
