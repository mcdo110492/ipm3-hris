import { createSelector } from "@ngrx/store";

import * as fromFeature from "./../reducers";
import * as fromUser from "./../reducers/user.reducer";

export const getUser = createSelector(
  fromFeature.getUserState,
  (state: fromFeature.UserState) => state.user
);

export const getUserUserRole = createSelector(getUser, fromUser.getUserRole);
export const getUserProfileName = createSelector(
  getUser,
  fromUser.getProfileName
);
export const getUserProfileImage = createSelector(
  getUser,
  fromUser.getProfileImage
);
export const getUserToken = createSelector(getUser, fromUser.getToken);
export const getUserRefreshToken = createSelector(
  getUser,
  fromUser.getRefreshToken
);
