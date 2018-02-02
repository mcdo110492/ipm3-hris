import * as EducationPrimaryActions from "./../actions/employee-education-primary.action";
import { EmployeeEducationPrimary } from "./../../models/employee-education-primary.model";

export interface State {
  data: EmployeeEducationPrimary;
  isLoading: boolean;
}

export const initialState: State = {
  data: null,
  isLoading: false
};

export function reducer(
  state = initialState,
  action: EducationPrimaryActions.EducationPrimaryActions
): State {
  switch (action.type) {
    case EducationPrimaryActions.LOAD_EDUCATIONPRIMARY_INFO:
    case EducationPrimaryActions.SAVE_EDUCATIONPRIMARY_INFO: {
      return { ...state, isLoading: true };
    }
    case EducationPrimaryActions.LOAD_EDUCATIONPRIMARY_INFO_SUCCESS: {
      const { payload } = action;
      return { ...state, data: payload, isLoading: false };
    }
    case EducationPrimaryActions.SAVE_EDUCATIONPRIMARY_INFO_SUCCESS:
    case EducationPrimaryActions.LOAD_EDUCATIONPRIMARY_INFO_FAIL:
    case EducationPrimaryActions.SAVE_EDUCATIONPRIMARY_INFO_FAIL: {
      return { ...state, isLoading: false };
    }
  }

  return state;
}

export const getEducationPrimaryData = (state: State) => state.data;
export const getEducationPrimaryIsLoading = (state: State) => state.isLoading;
