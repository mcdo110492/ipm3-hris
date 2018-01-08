import { createSelector } from "@ngrx/store";
import * as fromFeature from "./../reducers";
import * as fromEmployeeRegister from "./../reducers/employee-register.reducer";

export const getEmployeeRegister = createSelector(
  fromFeature.getEmployeeRegisterState,
  (state: fromFeature.EmployeeRegisterState) => state.employeeRegister
);

export const getEmployeeRegisterData = createSelector(
  getEmployeeRegister,
  fromEmployeeRegister.getEmployeeRegisterData
);
