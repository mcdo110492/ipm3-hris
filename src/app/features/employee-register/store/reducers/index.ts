import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromEmployeeRegister from "./employee-register.reducer";

export interface EmployeeRegisterState {
  employeeRegister: fromEmployeeRegister.State;
}

export const reducer: ActionReducerMap<EmployeeRegisterState> = {
  employeeRegister: fromEmployeeRegister.reducer
};

export const getEmployeeRegisterState = createFeatureSelector<
  EmployeeRegisterState
>("employeeRegister");
