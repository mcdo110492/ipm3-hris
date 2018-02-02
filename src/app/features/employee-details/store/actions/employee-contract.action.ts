import { Action } from "@ngrx/store";
import { EmployeeContract } from "./../../models/employee-contract.model";

export const LOAD_CONTRACT = "[EMPLOYEEDETAILS] LOAD CONTRACT";
export const LOAD_CONTRACT_FAIL = "[EMPLOYEEDETAILS] LOAD CONTRACT FAIL";
export const LOAD_CONTRACT_SUCCESS = "[EMPLOYEEDETAILS] LOAD CONTRACT SUCCESS";
export const CLEAR_ENTITIES_CONTRACT =
  "[EMPLOYEEDETAILS] CLEAR ENTITIES CONTRACT";

export class LoadContract implements Action {
  readonly type = LOAD_CONTRACT;
}

export class LoadContractFail implements Action {
  readonly type = LOAD_CONTRACT_FAIL;
  constructor(public payload: any) {}
}

export class LoadContractSuccess implements Action {
  readonly type = LOAD_CONTRACT_SUCCESS;
  constructor(public payload: EmployeeContract[]) {}
}

export class ClearEntitiesContract implements Action {
  readonly type = CLEAR_ENTITIES_CONTRACT;
}

export const CREATE_CONTRACT = "[EMPLOYEEDETAILS] CREATE CONTRACT";
export const CREATE_CONTRACT_FAIL = "[EMPLOYEEDETAILS] CREATE CONTRACT FAIL";
export const CREATE_CONTRACT_SUCCESS =
  "[EMPLOYEEDETAILS] CREATE CONTRACT SUCCESS";

export class CreateContract implements Action {
  readonly type = CREATE_CONTRACT;
  constructor(public payload: EmployeeContract) {}
}

export class CreateContractFail implements Action {
  readonly type = CREATE_CONTRACT_FAIL;
  constructor(public payload: any) {}
}

export class CreateContractSuccess implements Action {
  readonly type = CREATE_CONTRACT_SUCCESS;
  constructor(public payload: EmployeeContract) {}
}

export const UPDATE_CONTRACT = "[EMPLOYEEDETAILS] UPDATE CONTRACT";
export const UPDATE_CONTRACT_FAIL = "[EMPLOYEEDETAILS] UPDATE CONTRACT FAIL";
export const UPDATE_CONTRACT_SUCCESS =
  "[EMPLOYEEDETAILS] UPDATE CONTRACT SUCCESS";

export class UpdateContract implements Action {
  readonly type = UPDATE_CONTRACT;
  constructor(public payload: EmployeeContract) {}
}

export class UpdateContractFail implements Action {
  readonly type = UPDATE_CONTRACT_FAIL;
  constructor(public payload: any) {}
}

export class UpdateContractSuccess implements Action {
  readonly type = UPDATE_CONTRACT_SUCCESS;
  constructor(public payload: EmployeeContract) {}
}

export const SELECT_CONTRACT = "[EMPLOYEEDETAILS] SELECT CONTRACT";

export class SelectContract implements Action {
  readonly type = SELECT_CONTRACT;
  constructor(public payload: number) {}
}

export type ContractActions =
  | LoadContract
  | LoadContractFail
  | LoadContractSuccess
  | ClearEntitiesContract
  | CreateContract
  | CreateContractFail
  | CreateContractSuccess
  | UpdateContract
  | UpdateContractFail
  | UpdateContractSuccess
  | SelectContract;
