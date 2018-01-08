import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromEmployeeList from './employee-list.reducer';

export interface EmployeeListState {
    employeeList: fromEmployeeList.State
}

export const reducer : ActionReducerMap<EmployeeListState> = {
    employeeList: fromEmployeeList.reducer
};

export const getEmployeeListState = createFeatureSelector<EmployeeListState>('employeeList');
