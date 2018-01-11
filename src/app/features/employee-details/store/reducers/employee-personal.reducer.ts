import * as PersonalActions from "./../actions/employee-personal.action";
import { EmployeePersonal } from "./../../models/employee-personal.model";

export interface State {
  data: EmployeePersonal;
  isLoading: boolean;
}

export const initialState: State = {
  data: null,
  isLoading: false
};

export function reducer(
  state = initialState,
  action: PersonalActions.Actions
): State {
  switch (action.type) {
    case PersonalActions.LOAD_PERSONAL_INFO:
    case PersonalActions.SAVE_PERSONAL_INFO: {
      return { ...state, isLoading: true };
    }
    case PersonalActions.LOAD_PERSONAL_INFO_SUCCESS:
    case PersonalActions.SAVE_PERSONAL_INFO_SUCCESS: {
      const { payload } = action;
      return { ...state, data: payload, isLoading: false };
    }
    case PersonalActions.LOAD_PERSONAL_INFO_FAIL:
    case PersonalActions.SAVE_PERSONAL_INFO_FAIL: {
      return { ...state, isLoading: false };
    }
  }

  return state;
}

export const getPersonalData = (state: State) => state.data;
export const getPersonalIsLoading = (state: State) => state.isLoading;
