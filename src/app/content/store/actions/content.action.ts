import { Action } from "@ngrx/store";

export const IS_LOGIN_PAGE = "[CONTENT] IS LOGIN PAGE";
export const IS_PAGE_LOADER = "[CONTENT] IS PAGE LOADER";

export class IsLoginPage implements Action {
  readonly type = IS_LOGIN_PAGE;

  constructor(public payload: boolean) {}
}

export class IsPageLoader implements Action {
  readonly type = IS_PAGE_LOADER;
  constructor(public payload: boolean) {}
}

export type ContentActions = IsLoginPage | IsPageLoader;
