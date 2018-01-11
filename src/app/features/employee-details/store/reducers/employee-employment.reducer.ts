import * as EmploymentActions from "./../actions/employee-employment.action";
import { EmployeeEmployment } from "./../../models/employee-employment.model";

export interface State {
  data: EmployeeEmployment;
  isLoading: boolean;
}

export const initialState: State = {
  data: null,
  isLoading: false
};

export function reducer(
  state = initialState,
  action: EmploymentActions.EmploymentActions
): State {
  switch (action.type) {
    case EmploymentActions.LOAD_EMPLOYMENT_INFO:
    case EmploymentActions.SAVE_EMPLOYMENT_INFO: {
      return { ...state, isLoading: true };
    }

    case EmploymentActions.LOAD_EMPLOYMENT_INFO_SUCCESS:
    case EmploymentActions.SAVE_EMPLOYMENT_INFO_SUCCESS: {
      const { payload } = action;
      return { ...state, data: payload, isLoading: false };
    }
    case EmploymentActions.LOAD_EMPLOYMENT_INFO_FAIL:
    case EmploymentActions.SAVE_EMPLOYMENT_INFO_FAIL: {
      return { ...state, isLoading: false };
    }
  }

  return state;
}

export const getEmploymentData = (state: State) => state.data;
export const getEmploymentIsLoading = (state: State) => state.isLoading;
