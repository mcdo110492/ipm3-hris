import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromEmploymentStatus from "./employment-status.reducer";

export interface EmploymentStatusState {
  employmentStatus: fromEmploymentStatus.State;
}

export const reducer: ActionReducerMap<EmploymentStatusState> = {
  employmentStatus: fromEmploymentStatus.reducer
};

export const getEmploymentStatusState = createFeatureSelector<
  EmploymentStatusState
>("employmentStatus");
