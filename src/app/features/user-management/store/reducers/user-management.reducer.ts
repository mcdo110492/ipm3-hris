import * as fromUserManagement from "./../actions/user-management.action";
import { UserManagementModel } from "./../../models/user-management.model";

export interface State {
  pageLength: number;
  pageSize: number;
  pageIndex: number;
  sortField: string;
  sortDirection: string;
  searchQuery: string;
  entities: { [id: number]: UserManagementModel };
  isLoading: boolean;
  isLoaded: boolean;
  isSavingLoading: boolean;
}

export const initialState: State = {
  pageLength: 0,
  pageSize: 5,
  pageIndex: 0,
  sortField: "username",
  sortDirection: "asc",
  searchQuery: "",
  entities: {},
  isLoading: false,
  isLoaded: false,
  isSavingLoading: false
};

export function reducer(
  state = initialState,
  action: fromUserManagement.UserManagementActions
): State {
  switch (action.type) {
    case fromUserManagement.LOAD_USERMANAGEMENT: {
      return { ...state, isLoading: true };
    }

    case fromUserManagement.CLEAR_ENTITIES_USERMANAGEMENT: {
      return { ...state, entities: {} };
    }

    case fromUserManagement.LOAD_USERMANAGEMENT_SUCCESS: {
      const { data, count } = action.payload;
      const entities = data.reduce(
        (
          entities: { [id: number]: UserManagementModel },
          data: UserManagementModel
        ) => {
          return {
            ...entities,
            [data.userManagementTableHash]: data
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        entities,
        pageLength: count
      };
    }

    case fromUserManagement.LOAD_USERMANAGEMENT_FAIL: {
      return { ...state, isLoading: false, isLoaded: false };
    }

    case fromUserManagement.SEARCH_USERMANAGEMENT: {
      return {
        ...state,
        isLoading: true,
        searchQuery: action.payload,
        isLoaded: false
      };
    }

    case fromUserManagement.CREATE_USERMANAGEMENT: {
      return { ...state, isSavingLoading: true, isLoaded: false };
    }

    case fromUserManagement.CREATE_USERMANAGEMENT_SUCCESS:
    case fromUserManagement.CREATE_USERMANAGEMENT_FAIL: {
      return { ...state, isSavingLoading: false };
    }

    case fromUserManagement.PAGE_EVENT_USERMANAGEMENT: {
      return {
        ...state,
        pageSize: action.pageSize,
        pageIndex: action.pageIndex,
        isLoaded: false
      };
    }

    case fromUserManagement.SORT_EVENT_USERMANAGEMENT: {
      return {
        ...state,
        sortField: action.sortField,
        sortDirection: action.sortDirection,
        isLoaded: false
      };
    }

    case fromUserManagement.CHANGE_STATUS:
    case fromUserManagement.RESET_PASSWORD: {
      return { ...state, isLoading: true };
    }
    case fromUserManagement.REQUEST_SUCCESS:
    case fromUserManagement.REQUEST_FAIL: {
      return { ...state, isLoading: false };
    }
  }

  return state;
}

export const getPageLength = (state: State) => state.pageLength;
export const getPageSize = (state: State) => state.pageSize;
export const getPageIndex = (state: State) => state.pageIndex;
export const getSortField = (state: State) => state.sortField;
export const getSortDirection = (state: State) => state.sortDirection;
export const getSearchQuery = (state: State) => state.searchQuery;
export const getEntities = (state: State) => state.entities;
export const getIsLoading = (state: State) => state.isLoading;
export const getIsLoaded = (state: State) => state.isLoaded;
export const getIsSavingLoading = (state: State) => state.isSavingLoading;
