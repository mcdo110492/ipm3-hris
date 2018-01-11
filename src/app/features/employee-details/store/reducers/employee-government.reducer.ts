import * as GovernmentActions from "./../actions/employee-government.action";
import { EmployeeGovernment } from "./../../models/employee-government.model";

export interface State {
  data: EmployeeGovernment;
  isLoading: boolean;
}

export const initialState: State = {
  data: null,
  isLoading: false
};

export function reducer(
  state = initialState,
  action: GovernmentActions.GovernmentActions
): State {
  switch (action.type) {
    case GovernmentActions.LOAD_GOVERNMENT_INFO:
    case GovernmentActions.SAVE_GOVERNMENT_INFO: {
      return { ...state, isLoading: true };
    }
    case GovernmentActions.LOAD_GOVERNMENT_INFO_SUCCESS:
    case GovernmentActions.SAVE_GOVERNMENT_INFO_SUCCESS: {
      const { payload } = action;
      return { ...state, data: payload, isLoading: false };
    }
    case GovernmentActions.LOAD_GOVERNMENT_INFO_FAIL:
    case GovernmentActions.SAVE_GOVERNMENT_INFO_FAIL: {
      return { ...state, isLoading: false };
    }
  }

  return state;
}

export const getGovernmentData = (state: State) => state.data;
export const getGovernmentIsLoading = (state: State) => state.isLoading;
