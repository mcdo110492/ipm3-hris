import { createSelector } from "@ngrx/store";

import * as fromFeature from "./../reducers";
import * as fromLogin from "./../reducers/login.reducer";

export const getLogin = createSelector(
  fromFeature.getLoginState,
  (state: fromFeature.LoginState) => state.login
);

export const getLoginIsLogin = createSelector(getLogin, fromLogin.getIsLogin);
