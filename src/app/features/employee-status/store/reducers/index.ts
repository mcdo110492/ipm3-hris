import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromEmployeeStatus from './employee-status.reducer';

export interface EmployeeStatusState {
    employeeStatus: fromEmployeeStatus.State
}

export const reducer : ActionReducerMap<EmployeeStatusState> = {
    employeeStatus: fromEmployeeStatus.reducer
};

export const getEmployeeStatusState = createFeatureSelector<EmployeeStatusState>('employeeStatus');
