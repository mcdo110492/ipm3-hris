import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromSalaryType from './salary-type.reducer';

export interface SalaryTypeState {
    salaryType: fromSalaryType.State
}

export const reducer : ActionReducerMap<SalaryTypeState> = {
    salaryType: fromSalaryType.reducer
};

export const getSalaryTypeState = createFeatureSelector<SalaryTypeState>('salaryType');
