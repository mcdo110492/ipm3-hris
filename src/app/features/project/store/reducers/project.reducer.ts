import * as fromProject from "./../actions/project.action";
import { Project } from "./../../models/project.model";

export interface State {
  pageLength: number;
  pageSize: number;
  pageIndex: number;
  sortField: string;
  sortDirection: string;
  searchQuery: string;
  entities: { [id: number]: Project };
  selectedEntity: number;
  isLoading: boolean;
  isLoaded: boolean;
  isSavingLoading: boolean;
}

export const initialState: State = {
  pageLength: 0,
  pageSize: 5,
  pageIndex: 0,
  sortField: "projectCode",
  sortDirection: "asc",
  searchQuery: "",
  entities: {},
  selectedEntity: null,
  isLoading: false,
  isLoaded: false,
  isSavingLoading: false
};

export function reducer(
  state = initialState,
  action: fromProject.ProjectActions
): State {
  switch (action.type) {
    case fromProject.LOAD_PROJECT: {
      return { ...state, isLoading: true };
    }

    case fromProject.CLEAR_ENTITIES_PROJECT: {
      return { ...state, entities: {} };
    }

    case fromProject.LOAD_PROJECT_SUCCESS: {
      const { data, count } = action.payload;
      const entities = data.reduce(
        (entities: { [id: number]: Project }, data: Project) => {
          return {
            ...entities,
            [data.projectTableHash]: data
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

    case fromProject.LOAD_PROJECT_FAIL: {
      return { ...state, isLoading: false, isLoaded: false };
    }

    case fromProject.SEARCH_PROJECT: {
      return {
        ...state,
        isLoading: true,
        searchQuery: action.payload,
        isLoaded: false
      };
    }

    case fromProject.SELECT_PROJECT: {
      return { ...state, selectedEntity: action.payload };
    }

    case fromProject.CREATE_PROJECT: {
      return { ...state, isSavingLoading: true, isLoaded: false };
    }
    case fromProject.UPDATE_PROJECT: {
      return { ...state, isSavingLoading: true };
    }

    case fromProject.CREATE_PROJECT_SUCCESS:
    case fromProject.CREATE_PROJECT_FAIL:
    case fromProject.UPDATE_PROJECT_FAIL: {
      return { ...state, isSavingLoading: false };
    }

    case fromProject.UPDATE_PROJECT_SUCCESS: {
      const data = action.payload;
      const entities = {
        ...state.entities,
        [data.projectTableHash]: data
      };

      return { ...state, entities, isSavingLoading: false };
    }

    case fromProject.PAGE_EVENT_PROJECT: {
      return {
        ...state,
        pageSize: action.pageSize,
        pageIndex: action.pageIndex,
        isLoaded: false
      };
    }

    case fromProject.SORT_EVENT_PROJECT: {
      return {
        ...state,
        sortField: action.sortField,
        sortDirection: action.sortDirection,
        isLoaded: false
      };
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
export const getSelectedEntity = (state: State) => state.selectedEntity;
export const getIsLoading = (state: State) => state.isLoading;
export const getIsLoaded = (state: State) => state.isLoaded;
export const getIsSavingLoading = (state: State) => state.isSavingLoading;
