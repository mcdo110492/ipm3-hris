import * as HealthActions from "./../actions/employee-health.action";
import { EmployeeHealth } from "./../../models/employee-health.model";

export interface State {
  data: EmployeeHealth;
  isLoading: boolean;
}

export const initialState: State = {
  data: null,
  isLoading: false
};

export function reducer(
  state = initialState,
  action: HealthActions.HealthActions
): State {
  switch (action.type) {
    case HealthActions.LOAD_HEALTH_INFO:
    case HealthActions.SAVE_HEALTH_INFO: {
      return { ...state, isLoading: true };
    }
    case HealthActions.LOAD_HEALTH_INFO_SUCCESS:
    case HealthActions.SAVE_HEALTH_INFO_SUCCESS: {
      const { payload } = action;
      return { ...state, data: payload, isLoading: false };
    }
    case HealthActions.LOAD_HEALTH_INFO_FAIL:
    case HealthActions.SAVE_HEALTH_INFO_FAIL: {
      return { ...state, isLoading: false };
    }
  }

  return state;
}

export const getHealthData = (state: State) => state.data;
export const getHealthIsLoading = (state: State) => state.isLoading;
