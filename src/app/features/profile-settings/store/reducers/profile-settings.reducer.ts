import * as Actions from "./../actions/profile-settings.action";

export interface State {
  isLoading: boolean;
}

export const initialState: State = {
  isLoading: false
};

export function reducer(
  state = initialState,
  action: Actions.ProfileSettingActions
): State {
  switch (action.type) {
    case Actions.CHANGE_PASSWORD: {
      return { ...state, isLoading: true };
    }
    case Actions.CHANGE_PASSWORD_SUCCESS:
    case Actions.CHANGE_PASSWORD_FAIL: {
      return { ...state, isLoading: false };
    }
  }

  return state;
}

export const getIsLoading = (state: State) => state.isLoading;
