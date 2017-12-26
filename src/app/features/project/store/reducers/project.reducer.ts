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
  isLoaded: false
};

export function reducer(
  state = initialState,
  action: fromProject.ProjectActions
): State {
  switch (action.type) {
    case fromProject.LOAD_PROJECT: {
      return { ...state, isLoading: true };
    }

    case fromProject.LOAD_PROJECT_SUCCESS: {
      const { data, count } = action.payload;

      const entities = data.reduce(
        (entities: { [id: number]: Project }, data: Project) => {
          return {
            ...entities,
            [data.projectId]: data
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
      return { ...state, isLoading: true, searchQuery: action.payload };
    }

    case fromProject.SELECT_PROJECT: {
      return { ...state, selectedEntity: action.payload };
    }

    case fromProject.UPDATE_PROJECT_SUCCESS: {
      const data = action.payload;
      const entities = {
        ...state.entities,
        [data.projectId]: data
      };

      return { ...state, entities };
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
