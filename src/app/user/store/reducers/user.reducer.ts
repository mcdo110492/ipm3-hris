import * as fromUser from "./../actions/user.action";
import { User } from "./../../models/user.model";

export type State = User;

export const initialState: State = {
  username: null,
  profileName: null,
  userRole: 1,
  token: null,
  profileImage: "assets/default.jpg",
  refreshToken: null
};

export function reducer(
  state = initialState,
  action: fromUser.UserActions
): State {
  switch (action.type) {
    case fromUser.SET_USER: {
      const user = action.payload;

      return { ...state, ...user };
    }
    case fromUser.LOGOUT_USER: {
      return { ...state, ...initialState };
    }
  }

  return state;
}

export const getUsername = (state: State) => state.username;
export const getUserRole = (state: State) => state.userRole;
export const getProfileName = (state: State) => state.profileName;
export const getProfileImage = (state: State) => state.profileImage;
export const getToken = (state: State) => state.token;
export const getRefreshToken = (state: State) => state.refreshToken;
