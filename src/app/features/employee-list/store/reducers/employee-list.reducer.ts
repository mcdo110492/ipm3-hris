import * as fromEmployeeList from "./../actions/employee-list.action";
import { EmployeeList } from "./../../models/employee-list.model";

export interface State {
  pageLength: number;
  pageSize: number;
  pageIndex: number;
  sortField: string;
  sortDirection: string;
  searchQuery: string;
  entities: { [id: number]: EmployeeList };
  isLoading: boolean;
}

export const initialState: State = {
  pageLength: 0,
  pageSize: 5,
  pageIndex: 0,
  sortField: "employeeNumber",
  sortDirection: "asc",
  searchQuery: "",
  entities: {},
  isLoading: false
};

export function reducer(
  state = initialState,
  action: fromEmployeeList.EmployeeListActions
): State {
  switch (action.type) {
    case fromEmployeeList.LOAD_EMPLOYEELIST: {
      return { ...state, isLoading: true };
    }

    case fromEmployeeList.CLEAR_ENTITIES_EMPLOYEELIST: {
      return { ...state, entities: {} };
    }

    case fromEmployeeList.LOAD_EMPLOYEELIST_SUCCESS: {
      const { data, count } = action.payload;

      const entities = data.reduce(
        (entities: { [id: number]: EmployeeList }, data: EmployeeList) => {
          return {
            ...entities,
            [data.employeeListTableHash]: data
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        isLoading: false,
        entities,
        pageLength: count
      };
    }

    case fromEmployeeList.LOAD_EMPLOYEELIST_FAIL: {
      return { ...state, isLoading: false };
    }

    case fromEmployeeList.SEARCH_EMPLOYEELIST: {
      return { ...state, isLoading: true, searchQuery: action.payload };
    }

    case fromEmployeeList.PAGE_EVENT_EMPLOYEELIST: {
      return {
        ...state,
        pageSize: action.pageSize,
        pageIndex: action.pageIndex
      };
    }

    case fromEmployeeList.SORT_EVENT_EMPLOYEELIST: {
      return {
        ...state,
        sortField: action.sortField,
        sortDirection: action.sortDirection
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
export const getIsLoading = (state: State) => state.isLoading;
