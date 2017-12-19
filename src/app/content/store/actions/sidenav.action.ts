import { Action } from "@ngrx/store";

import { SidenavLink } from "./../../models/sidenav-link.model";

export const IS_SIDENAV_OPEN = "[SIDENAV] IS SIDENAV OPEN";
export const IS_SIDENAV_TOGGLE = "[SIDENAV] IS SIDENAV TOGGLE";
export const IS_SIDENAV_MODE = "[SIDENAV] IS SIDENAV MODE";
export const SIDENAV_LINKS = "[SIDENAV] SIDENAV LINKS";

export class IsSidenavOpen implements Action {
  readonly type = IS_SIDENAV_OPEN;

  constructor(public payload: boolean) {}
}

export class IsSidenavToggle implements Action {
  readonly type = IS_SIDENAV_TOGGLE;
}

export class IsSidenavMode implements Action {
  readonly type = IS_SIDENAV_MODE;

  constructor(public payload: string) {}
}

export class SidenavLinks implements Action {
  readonly type = SIDENAV_LINKS;

  constructor(public payload: SidenavLink[]) {}
}

export type SidenavActions =
  | IsSidenavOpen
  | IsSidenavToggle
  | IsSidenavMode
  | SidenavLinks;
