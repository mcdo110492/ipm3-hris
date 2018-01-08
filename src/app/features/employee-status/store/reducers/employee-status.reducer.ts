import * as fromEmployeeStatus from "./../actions/employee-status.action";
import { EmployeeStatus } from "./../../models/employee-status.model";

export interface State {
  pageLength: number;
  pageSize: number;
  pageIndex: number;
  sortField: string;
  sortDirection: string;
  searchQuery: string;
  entities: { [id: number]: EmployeeStatus };
  selectedEntity: number;
  isLoading: boolean;
  isLoaded: boolean;
  isSavingLoading: boolean;
}

export const initialState: State = {
  pageLength: 0,
  pageSize: 5,
  pageIndex: 0,
  sortField: "employeeStatusCode",
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
  action: fromEmployeeStatus.EmployeeStatusActions
): State {
  switch (action.type) {
    case fromEmployeeStatus.LOAD_EMPLOYEESTATUS: {
      return { ...state, isLoading: true };
    }

    case fromEmployeeStatus.CLEAR_ENTITIES_EMPLOYEESTATUS: {
      return { ...state, entities: {} };
    }

    case fromEmployeeStatus.LOAD_EMPLOYEESTATUS_SUCCESS: {
      const { data, count } = action.payload;

      const entities = data.reduce(
        (entities: { [id: number]: EmployeeStatus }, data: EmployeeStatus) => {
          return {
            ...entities,
            [data.employeeStatusTableHash]: data
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

    case fromEmployeeStatus.LOAD_EMPLOYEESTATUS_FAIL: {
      return { ...state, isLoading: false, isLoaded: false };
    }

    case fromEmployeeStatus.SEARCH_EMPLOYEESTATUS: {
      return {
        ...state,
        isLoading: true,
        searchQuery: action.payload,
        isLoaded: false
      };
    }

    case fromEmployeeStatus.SELECT_EMPLOYEESTATUS: {
      return { ...state, selectedEntity: action.payload };
    }

    case fromEmployeeStatus.CREATE_EMPLOYEESTATUS: {
      return { ...state, isSavingLoading: true, isLoaded: false };
    }
    case fromEmployeeStatus.UPDATE_EMPLOYEESTATUS: {
      return { ...state, isSavingLoading: true };
    }

    case fromEmployeeStatus.CREATE_EMPLOYEESTATUS_SUCCESS:
    case fromEmployeeStatus.CREATE_EMPLOYEESTATUS_FAIL:
    case fromEmployeeStatus.UPDATE_EMPLOYEESTATUS_FAIL: {
      return { ...state, isSavingLoading: false };
    }

    case fromEmployeeStatus.UPDATE_EMPLOYEESTATUS_SUCCESS: {
      const data = action.payload;
      const entities = {
        ...state.entities,
        [data.employeeStatusTableHash]: data
      };

      return { ...state, entities, isSavingLoading: false };
    }

    case fromEmployeeStatus.PAGE_EVENT_EMPLOYEESTATUS: {
      return {
        ...state,
        pageSize: action.pageSize,
        pageIndex: action.pageIndex,
        isLoaded: false
      };
    }

    case fromEmployeeStatus.SORT_EVENT_EMPLOYEESTATUS: {
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
