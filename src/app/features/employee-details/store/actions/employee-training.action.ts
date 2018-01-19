import { Action } from "@ngrx/store";
import { EmployeeTraining } from "./../../models/employee-training.model";

export const LOAD_TRAINING = "[EMPLOYEEDETAILS] LOAD TRAINING";
export const LOAD_TRAINING_FAIL = "[EMPLOYEEDETAILS] LOAD TRAINING FAIL";
export const LOAD_TRAINING_SUCCESS = "[EMPLOYEEDETAILS] LOAD TRAINING SUCCESS";
export const CLEAR_ENTITIES_TRAINING =
  "[EMPLOYEEDETAILS] CLEAR ENTITIES TRAINING";

export class LoadTraining implements Action {
  readonly type = LOAD_TRAINING;
}

export class LoadTrainingFail implements Action {
  readonly type = LOAD_TRAINING_FAIL;
  constructor(public payload: any) {}
}

export class LoadTrainingSuccess implements Action {
  readonly type = LOAD_TRAINING_SUCCESS;
  constructor(public payload: EmployeeTraining[]) {}
}

export class ClearEntitiesTraining implements Action {
  readonly type = CLEAR_ENTITIES_TRAINING;
}

export const CREATE_TRAINING = "[EMPLOYEEDETAILS] CREATE TRAINING";
export const CREATE_TRAINING_FAIL = "[EMPLOYEEDETAILS] CREATE TRAINING FAIL";
export const CREATE_TRAINING_SUCCESS =
  "[EMPLOYEEDETAILS] CREATE TRAINING SUCCESS";

export class CreateTraining implements Action {
  readonly type = CREATE_TRAINING;
  constructor(public payload: EmployeeTraining) {}
}

export class CreateTrainingFail implements Action {
  readonly type = CREATE_TRAINING_FAIL;
  constructor(public payload: any) {}
}

export class CreateTrainingSuccess implements Action {
  readonly type = CREATE_TRAINING_SUCCESS;
  constructor(public payload: EmployeeTraining) {}
}

export const UPDATE_TRAINING = "[EMPLOYEEDETAILS] UPDATE TRAINING";
export const UPDATE_TRAINING_FAIL = "[EMPLOYEEDETAILS] UPDATE TRAINING FAIL";
export const UPDATE_TRAINING_SUCCESS =
  "[EMPLOYEEDETAILS] UPDATE TRAINING SUCCESS";

export class UpdateTraining implements Action {
  readonly type = UPDATE_TRAINING;
  constructor(public payload: EmployeeTraining) {}
}

export class UpdateTrainingFail implements Action {
  readonly type = UPDATE_TRAINING_FAIL;
  constructor(public payload: any) {}
}

export class UpdateTrainingSuccess implements Action {
  readonly type = UPDATE_TRAINING_SUCCESS;
  constructor(public payload: EmployeeTraining) {}
}

export const SELECT_TRAINING = "[EMPLOYEEDETAILS] SELECT TRAINING";

export class SelectTraining implements Action {
  readonly type = SELECT_TRAINING;
  constructor(public payload: number) {}
}

export type TrainingActions =
  | LoadTraining
  | LoadTrainingFail
  | LoadTrainingSuccess
  | ClearEntitiesTraining
  | CreateTraining
  | CreateTrainingFail
  | CreateTrainingSuccess
  | UpdateTraining
  | UpdateTrainingFail
  | UpdateTrainingSuccess
  | SelectTraining;
