import { Action } from "@ngrx/store";
import {
  ProfileSettingsModel,
  ProfileSettingsResponse
} from "@app/features/profile-settings/models/profile-settings.model";

export const CHANGE_PASSWORD = "[PROFILESETTINGS] ChangePassword";

export class ChangePassword implements Action {
  readonly type = CHANGE_PASSWORD;
  constructor(public payload: ProfileSettingsModel) {}
}

export const CHANGE_PASSWORD_SUCCESS =
  "[PROFILESETTINGS] ChangePasswordSuccess";

export class ChangePasswordSuccess implements Action {
  readonly type = CHANGE_PASSWORD_SUCCESS;
  constructor(public payload: ProfileSettingsResponse) {}
}

export const CHANGE_PASSWORD_FAIL = "[PROFILESETTINGS] ChangePasswordFail";

export class ChangePasswordFail implements Action {
  readonly type = CHANGE_PASSWORD_FAIL;
  constructor(public payload: any) {}
}

export type ProfileSettingActions =
  | ChangePassword
  | ChangePasswordSuccess
  | ChangePasswordFail;
