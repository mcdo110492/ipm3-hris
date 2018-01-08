import * as fromEmploymentStatus from "./../actions/employment-status.action";
import { EmploymentStatus } from "./../../models/employment-status.model";

export interface State {
  pageLength: number;
  pageSize: number;
  pageIndex: number;
  sortField: string;
  sortDirection: string;
  searchQuery: string;
  entities: { [id: number]: EmploymentStatus };
  selectedEntity: number;
  isLoading: boolean;
  isLoaded: boolean;
  isSavingLoading: boolean;
}

export const initialState: State = {
  pageLength: 0,
  pageSize: 5,
  pageIndex: 0,
  sortField: "employmentStatusCode",
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
  action: fromEmploymentStatus.EmploymentStatusActions
): State {
  switch (action.type) {
    case fromEmploymentStatus.LOAD_EMPLOYMENTSTATUS: {
      return { ...state, isLoading: true };
    }

    case fromEmploymentStatus.CLEAR_ENTITIES_EMPLOYMENTSTATUS: {
      return { ...state, entities: {} };
    }

    case fromEmploymentStatus.LOAD_EMPLOYMENTSTATUS_SUCCESS: {
      const { data, count } = action.payload;

      const entities = data.reduce(
        (
          entities: { [id: number]: EmploymentStatus },
          data: EmploymentStatus
        ) => {
          return {
            ...entities,
            [data.employmentStatusTableHash]: data
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

    case fromEmploymentStatus.LOAD_EMPLOYMENTSTATUS_FAIL: {
      return { ...state, isLoading: false, isLoaded: false };
    }

    case fromEmploymentStatus.SEARCH_EMPLOYMENTSTATUS: {
      return {
        ...state,
        isLoading: true,
        searchQuery: action.payload,
        isLoaded: false
      };
    }

    case fromEmploymentStatus.SELECT_EMPLOYMENTSTATUS: {
      return { ...state, selectedEntity: action.payload };
    }

    case fromEmploymentStatus.CREATE_EMPLOYMENTSTATUS: {
      return { ...state, isSavingLoading: true, isLoaded: false };
    }
    case fromEmploymentStatus.UPDATE_EMPLOYMENTSTATUS: {
      return { ...state, isSavingLoading: true };
    }

    case fromEmploymentStatus.CREATE_EMPLOYMENTSTATUS_SUCCESS:
    case fromEmploymentStatus.CREATE_EMPLOYMENTSTATUS_FAIL:
    case fromEmploymentStatus.UPDATE_EMPLOYMENTSTATUS_FAIL: {
      return { ...state, isSavingLoading: false };
    }

    case fromEmploymentStatus.UPDATE_EMPLOYMENTSTATUS_SUCCESS: {
      const data = action.payload;
      const entities = {
        ...state.entities,
        [data.employmentStatusTableHash]: data
      };

      return { ...state, entities, isSavingLoading: false };
    }

    case fromEmploymentStatus.PAGE_EVENT_EMPLOYMENTSTATUS: {
      return {
        ...state,
        pageSize: action.pageSize,
        pageIndex: action.pageIndex,
        isLoaded: false
      };
    }

    case fromEmploymentStatus.SORT_EVENT_EMPLOYMENTSTATUS: {
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
