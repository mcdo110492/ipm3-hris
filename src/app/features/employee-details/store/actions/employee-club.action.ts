import { Action } from "@ngrx/store";
import { EmployeeClub } from "./../../models/employee-club.model";

export const LOAD_CLUB = "[EMPLOYEEDETAILS] LOAD CLUB";
export const LOAD_CLUB_FAIL = "[EMPLOYEEDETAILS] LOAD CLUB FAIL";
export const LOAD_CLUB_SUCCESS = "[EMPLOYEEDETAILS] LOAD CLUB SUCCESS";
export const CLEAR_ENTITIES_CLUB = "[EMPLOYEEDETAILS] CLEAR ENTITIES CLUB";

export class LoadClub implements Action {
  readonly type = LOAD_CLUB;
}

export class LoadClubFail implements Action {
  readonly type = LOAD_CLUB_FAIL;
  constructor(public payload: any) {}
}

export class LoadClubSuccess implements Action {
  readonly type = LOAD_CLUB_SUCCESS;
  constructor(public payload: EmployeeClub[]) {}
}

export class ClearEntitiesClub implements Action {
  readonly type = CLEAR_ENTITIES_CLUB;
}

export const CREATE_CLUB = "[EMPLOYEEDETAILS] CREATE CLUB";
export const CREATE_CLUB_FAIL = "[EMPLOYEEDETAILS] CREATE CLUB FAIL";
export const CREATE_CLUB_SUCCESS = "[EMPLOYEEDETAILS] CREATE CLUB SUCCESS";

export class CreateClub implements Action {
  readonly type = CREATE_CLUB;
  constructor(public payload: EmployeeClub) {}
}

export class CreateClubFail implements Action {
  readonly type = CREATE_CLUB_FAIL;
  constructor(public payload: any) {}
}

export class CreateClubSuccess implements Action {
  readonly type = CREATE_CLUB_SUCCESS;
  constructor(public payload: EmployeeClub) {}
}

export const UPDATE_CLUB = "[EMPLOYEEDETAILS] UPDATE CLUB";
export const UPDATE_CLUB_FAIL = "[EMPLOYEEDETAILS] UPDATE CLUB FAIL";
export const UPDATE_CLUB_SUCCESS = "[EMPLOYEEDETAILS] UPDATE CLUB SUCCESS";

export class UpdateClub implements Action {
  readonly type = UPDATE_CLUB;
  constructor(public payload: EmployeeClub) {}
}

export class UpdateClubFail implements Action {
  readonly type = UPDATE_CLUB_FAIL;
  constructor(public payload: any) {}
}

export class UpdateClubSuccess implements Action {
  readonly type = UPDATE_CLUB_SUCCESS;
  constructor(public payload: EmployeeClub) {}
}

export const SELECT_CLUB = "[EMPLOYEEDETAILS] SELECT CLUB";

export class SelectClub implements Action {
  readonly type = SELECT_CLUB;
  constructor(public payload: number) {}
}

export type ClubActions =
  | LoadClub
  | LoadClubFail
  | LoadClubSuccess
  | ClearEntitiesClub
  | CreateClub
  | CreateClubFail
  | CreateClubSuccess
  | UpdateClub
  | UpdateClubFail
  | UpdateClubSuccess
  | SelectClub;
