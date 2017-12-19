import * as fromContent from "./../actions/content.action";

export interface State {
  isLoginPage: boolean;
  isPageLoader: boolean;
  currentProjectId: number;
}

export const initialState: State = {
  isLoginPage: false,
  isPageLoader: false,
  currentProjectId: +localStorage.getItem("projectId") || 1
};

export function reducer(
  state = initialState,
  action: fromContent.ContentActions
): State {
  switch (action.type) {
    case fromContent.IS_LOGIN_PAGE: {
      return { ...state, isLoginPage: action.payload };
    }

    case fromContent.IS_PAGE_LOADER: {
      return { ...state, isPageLoader: action.payload };
    }

    case fromContent.CURRENT_PROJECT_ID: {
      return { ...state, currentProjectId: action.payload };
    }
  }

  return state;
}

export const isLoginPage = (state: State) => state.isLoginPage;
export const isPageLoader = (state: State) => state.isPageLoader;
export const currentProject = (state: State) => state.currentProjectId;
