import { Action } from "@ngrx/store";
import { Position } from "@app/features/position/models";
import { Project } from "@app/features/project/models";
import { EmploymentStatus } from "@app/features/employment-status/models";
import { EmployeeStatus } from "@app/features/employee-status/models";
import { ContractType } from "@app/features/contract-type/models";
import { SalaryType } from "@app/features/salary-type/models";

export const LOAD_ALL_POSITIONS = "[MASTERDATA] LOAD ALL POSITIONS";
export const LOAD_ALL_POSITIONS_SUCCESS =
  "[MASTERDATA] LOAD ALL POSITION SUCCESS";
export const LOAD_ALL_POSITIONS_FAIL = "[MASTERDATA] LOAD ALL POSITION FAIL";

export class LoadAllPositions implements Action {
  readonly type = LOAD_ALL_POSITIONS;
}

export class LoadAllPositionsSuccess implements Action {
  readonly type = LOAD_ALL_POSITIONS_SUCCESS;

  constructor(public payload: Position[]) {}
}

export class LoadAllPositionsFail implements Action {
  readonly type = LOAD_ALL_POSITIONS_FAIL;
  constructor(public payload: any) {}
}

export const LOAD_ALL_PROJECTS = "[MASTERDATA] LOAD ALL PROJECTS";
export const LOAD_ALL_PROJECTS_SUCCESS =
  "[MASTERDATA] LOAD ALL PROJECTS SUCCESS";
export const LOAD_ALL_PROJECTS_FAIL = "[MASTERDATA] LOAD ALL PROJECTS FAIL";

export class LoadAllProjects implements Action {
  readonly type = LOAD_ALL_PROJECTS;
}

export class LoadAllProjectsSuccess implements Action {
  readonly type = LOAD_ALL_PROJECTS_SUCCESS;

  constructor(public payload: Project[]) {}
}

export class LoadAllProjectsFail implements Action {
  readonly type = LOAD_ALL_PROJECTS_FAIL;
  constructor(public payload: any) {}
}

export const LOAD_ALL_EMPLOYEESTATUS = "[MASTERDATA] LOAD ALL EMPLOYEESTATUS";
export const LOAD_ALL_EMPLOYEESTATUS_SUCCESS =
  "[MASTERDATA] LOAD ALL EMPLOYEESTATUS SUCCESS";
export const LOAD_ALL_EMPLOYEESTATUS_FAIL =
  "[MASTERDATA] LOAD ALL EMPLOYEESTATUS FAIL";

export class LoadAllEmployeeStatus implements Action {
  readonly type = LOAD_ALL_EMPLOYEESTATUS;
}

export class LoadAllEmployeeStatusSuccess implements Action {
  readonly type = LOAD_ALL_EMPLOYEESTATUS_SUCCESS;

  constructor(public payload: EmployeeStatus[]) {}
}

export class LoadAllEmployeeStatusFail implements Action {
  readonly type = LOAD_ALL_EMPLOYEESTATUS_FAIL;
  constructor(public payload: any) {}
}

export const LOAD_ALL_EMPLOYMENTSTATUS =
  "[MASTERDATA] LOAD ALL EMPLOYMENTSTATUS";
export const LOAD_ALL_EMPLOYMENTSTATUS_SUCCESS =
  "[MASTERDATA] LOAD ALL EMPLOYMENTSTATUS SUCCESS";
export const LOAD_ALL_EMPLOYMENTSTATUS_FAIL =
  "[MASTERDATA] LOAD ALL EMPLOYMENTSTATUS FAIL";

export class LoadAllEmploymentStatus implements Action {
  readonly type = LOAD_ALL_EMPLOYMENTSTATUS;
}

export class LoadAllEmploymentStatusSuccess implements Action {
  readonly type = LOAD_ALL_EMPLOYMENTSTATUS_SUCCESS;

  constructor(public payload: EmploymentStatus[]) {}
}

export class LoadAllEmploymentStatusFail implements Action {
  readonly type = LOAD_ALL_EMPLOYMENTSTATUS_FAIL;
  constructor(public payload: any) {}
}

export const LOAD_ALL_CONTRACTTYPE = "[MASTERDATA] LOAD ALL CONTRACTTYPE";
export const LOAD_ALL_CONTRACTTYPE_SUCCESS =
  "[MASTERDATA] LOAD ALL CONTRACTTYPE SUCCESS";
export const LOAD_ALL_CONTRACTTYPE_FAIL =
  "[MASTERDATA] LOAD ALL CONTRACTTYPE FAIL";

export class LoadAllContractType implements Action {
  readonly type = LOAD_ALL_CONTRACTTYPE;
}

export class LoadAllContractTypeSuccess implements Action {
  readonly type = LOAD_ALL_CONTRACTTYPE_SUCCESS;

  constructor(public payload: ContractType[]) {}
}

export class LoadAllContractTypeFail implements Action {
  readonly type = LOAD_ALL_CONTRACTTYPE_FAIL;
  constructor(public payload: any) {}
}

export const LOAD_ALL_SALARYTYPE = "[MASTERDATA] LOAD ALL SALARYTYPE";
export const LOAD_ALL_SALARYTYPE_SUCCESS =
  "[MASTERDATA] LOAD ALL SALARYTYPE SUCCESS";
export const LOAD_ALL_SALARYTYPE_FAIL =
  "[MASTERDATA] LOAD ALL CONTRACTTYPE FAIL";

export class LoadAllSalaryType implements Action {
  readonly type = LOAD_ALL_SALARYTYPE;
}

export class LoadAllSalaryTypeSuccess implements Action {
  readonly type = LOAD_ALL_SALARYTYPE_SUCCESS;

  constructor(public payload: SalaryType[]) {}
}

export class LoadAllSalaryTypeFail implements Action {
  readonly type = LOAD_ALL_SALARYTYPE_FAIL;
  constructor(public payload: any) {}
}

export type Actions =
  | LoadAllPositions
  | LoadAllPositionsSuccess
  | LoadAllPositionsFail
  | LoadAllProjects
  | LoadAllProjectsSuccess
  | LoadAllProjectsFail
  | LoadAllEmployeeStatus
  | LoadAllEmployeeStatusSuccess
  | LoadAllEmployeeStatusFail
  | LoadAllEmploymentStatus
  | LoadAllEmploymentStatusSuccess
  | LoadAllEmploymentStatusFail
  | LoadAllContractType
  | LoadAllContractTypeSuccess
  | LoadAllContractTypeFail
  | LoadAllSalaryType
  | LoadAllSalaryTypeSuccess
  | LoadAllSalaryTypeFail;
