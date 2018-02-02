import * as EducationSecondaryActions from "./../actions/employee-education-secondary.action";
import { EmployeeEducationSecondary } from "./../../models/employee-education-secondary.model";

export interface State {
  data: EmployeeEducationSecondary;
  isLoading: boolean;
}

export const initialState: State = {
  data: null,
  isLoading: false
};

export function reducer(
  state = initialState,
  action: EducationSecondaryActions.EducationSecondaryActions
): State {
  switch (action.type) {
    case EducationSecondaryActions.LOAD_EDUCATIONSECONDARY_INFO:
    case EducationSecondaryActions.SAVE_EDUCATIONSECONDARY_INFO: {
      return { ...state, isLoading: true };
    }
    case EducationSecondaryActions.LOAD_EDUCATIONSECONDARY_INFO_SUCCESS: {
      const { payload } = action;
      return { ...state, data: payload, isLoading: false };
    }
    case EducationSecondaryActions.SAVE_EDUCATIONSECONDARY_INFO_SUCCESS:
    case EducationSecondaryActions.LOAD_EDUCATIONSECONDARY_INFO_FAIL:
    case EducationSecondaryActions.SAVE_EDUCATIONSECONDARY_INFO_FAIL: {
      return { ...state, isLoading: false };
    }
  }

  return state;
}

export const getEducationSecondaryData = (state: State) => state.data;
export const getEducationSecondaryIsLoading = (state: State) => state.isLoading;
