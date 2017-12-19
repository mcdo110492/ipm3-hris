import * as fromLogin from "./../actions/login.action";

export interface State {
  isLogin: boolean;
}

export const initialState: State = {
  isLogin: false
};

export function reducer(
  state = initialState,
  action: fromLogin.LoginActions
): State {
  switch (action.type) {
    case fromLogin.LOGIN_SUCCESS: {
      return { ...state, isLogin: true };
    }

    case fromLogin.LOGIN_FAIL: {
      return { ...state, isLogin: false };
    }
  }

  return state;
}

export const getIsLogin = (state: State) => state.isLogin;
