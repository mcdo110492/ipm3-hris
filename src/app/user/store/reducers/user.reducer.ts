import * as fromUser from "./../actions/user.action";
import { User } from "./../../models/user.model";

export type State = User;

const initialPresence = parsePresence();

export const initialState: State = {
  profileName: initialPresence.profileName,
  userRole: initialPresence.userRole,
  token: initialPresence.token,
  profileImage: initialPresence.profileImage,
  refreshToken: initialPresence.refreshToken
};

export function reducer(
  state = initialState,
  action: fromUser.UserActions
): State {
  switch (action.type) {
    case fromUser.SET_USER: {
      const {
        profileName,
        profileImage,
        userRole,
        token,
        refreshToken
      } = action.payload;

      return {
        ...state,
        profileName,
        profileImage,
        userRole,
        token,
        refreshToken
      };
    }
    case fromUser.LOGOUT_USER: {
      const {
        profileName,
        profileImage,
        userRole,
        token,
        refreshToken
      } = initialState;
      return {
        ...state,
        profileName,
        profileImage,
        userRole,
        token,
        refreshToken
      };
    }

    case fromUser.CHANGE_PROFILE_PHOTO: {
      const profileImage = action.payload;
      const presence = JSON.parse(localStorage.presence || null);
      const newPresence = JSON.stringify({
        profileName: presence.profileName,
        profileImage,
        userRole: presence.userRole,
        token: presence.token,
        refreshToken: presence.refreshToken
      });
      localStorage.setItem("presence", newPresence);
      return { ...state, profileImage };
    }
  }

  return state;
}

export const getUserRole = (state: State) => state.userRole;
export const getProfileName = (state: State) => state.profileName;
export const getProfileImage = (state: State) => state.profileImage;
export const getToken = (state: State) => state.token;
export const getRefreshToken = (state: State) => state.refreshToken;

function parsePresence() {
  const presence = JSON.parse(localStorage.presence || null);

  if (presence != null) {
    return {
      profileName: presence.profileName,
      profileImage: presence.profileImage,
      userRole: presence.userRole,
      token: presence.token,
      refreshToken: presence.refreshToken
    };
  } else {
    return {
      profileName: null,
      profileImage: "avatars/default.jpg",
      userRole: 0,
      token: null,
      refreshToken: null
    };
  }
}
