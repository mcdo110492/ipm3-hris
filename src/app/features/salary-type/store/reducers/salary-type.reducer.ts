import * as fromSalaryType from "./../actions/salary-type.action";
import { SalaryType } from "./../../models/salary-type.model";

export interface State {
  pageLength: number;
  pageSize: number;
  pageIndex: number;
  sortField: string;
  sortDirection: string;
  searchQuery: string;
  entities: { [id: number]: SalaryType };
  selectedEntity: number;
  isLoading: boolean;
  isLoaded: boolean;
  isSavingLoading: boolean;
}

export const initialState: State = {
  pageLength: 0,
  pageSize: 5,
  pageIndex: 0,
  sortField: "salaryTypeCode",
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
  action: fromSalaryType.SalaryTypeActions
): State {
  switch (action.type) {
    case fromSalaryType.LOAD_SALARYTYPE: {
      return { ...state, isLoading: true };
    }

    case fromSalaryType.CLEAR_ENTITIES_SALARYTYPE: {
      return { ...state, entities: {} };
    }

    case fromSalaryType.LOAD_SALARYTYPE_SUCCESS: {
      const { data, count } = action.payload;

      const entities = data.reduce(
        (entities: { [id: number]: SalaryType }, data: SalaryType) => {
          return {
            ...entities,
            [data.salaryTypeTableHash]: data
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

    case fromSalaryType.LOAD_SALARYTYPE_FAIL: {
      return { ...state, isLoading: false, isLoaded: false };
    }

    case fromSalaryType.SEARCH_SALARYTYPE: {
      return { ...state, isLoading: true, searchQuery: action.payload };
    }

    case fromSalaryType.SELECT_SALARYTYPE: {
      return { ...state, selectedEntity: action.payload };
    }

    case fromSalaryType.CREATE_SALARYTYPE:
    case fromSalaryType.UPDATE_SALARYTYPE: {
      return { ...state, isSavingLoading: true };
    }

    case fromSalaryType.CREATE_SALARYTYPE_SUCCESS:
    case fromSalaryType.CREATE_SALARYTYPE_FAIL:
    case fromSalaryType.UPDATE_SALARYTYPE_FAIL: {
      return { ...state, isSavingLoading: false };
    }

    case fromSalaryType.UPDATE_SALARYTYPE_SUCCESS: {
      const data = action.payload;
      const entities = {
        ...state.entities,
        [data.salaryTypeTableHash]: data
      };

      return { ...state, entities, isSavingLoading: false };
    }

    case fromSalaryType.PAGE_EVENT_SALARYTYPE: {
      return {
        ...state,
        pageSize: action.pageSize,
        pageIndex: action.pageIndex
      };
    }

    case fromSalaryType.SORT_EVENT_SALARYTYPE: {
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
export const getSelectedEntity = (state: State) => state.selectedEntity;
export const getIsLoading = (state: State) => state.isLoading;
export const getIsLoaded = (state: State) => state.isLoaded;
export const getIsSavingLoading = (state: State) => state.isSavingLoading;
