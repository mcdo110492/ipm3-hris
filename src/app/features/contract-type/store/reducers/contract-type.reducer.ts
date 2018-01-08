import * as fromContractType from "./../actions/contract-type.action";
import { ContractType } from "./../../models/contract-type.model";

export interface State {
  pageLength: number;
  pageSize: number;
  pageIndex: number;
  sortField: string;
  sortDirection: string;
  searchQuery: string;
  entities: { [id: number]: ContractType };
  selectedEntity: number;
  isLoading: boolean;
  isLoaded: boolean;
  isSavingLoading: boolean;
}

export const initialState: State = {
  pageLength: 0,
  pageSize: 5,
  pageIndex: 0,
  sortField: "contractTypeCode",
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
  action: fromContractType.ContractTypeActions
): State {
  switch (action.type) {
    case fromContractType.LOAD_CONTRACTTYPE: {
      return { ...state, isLoading: true };
    }

    case fromContractType.CLEAR_ENTITIES_CONTRACTTYPE: {
      return { ...state, entities: {} };
    }

    case fromContractType.LOAD_CONTRACTTYPE_SUCCESS: {
      const { data, count } = action.payload;

      const entities = data.reduce(
        (entities: { [id: number]: ContractType }, data: ContractType) => {
          return {
            ...entities,
            [data.contractTypeTableHash]: data
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

    case fromContractType.LOAD_CONTRACTTYPE_FAIL: {
      return { ...state, isLoading: false, isLoaded: false };
    }

    case fromContractType.SEARCH_CONTRACTTYPE: {
      return { ...state, isLoading: true, searchQuery: action.payload };
    }

    case fromContractType.SELECT_CONTRACTTYPE: {
      return { ...state, selectedEntity: action.payload };
    }

    case fromContractType.CREATE_CONTRACTTYPE:
    case fromContractType.UPDATE_CONTRACTTYPE: {
      return { ...state, isSavingLoading: true };
    }

    case fromContractType.CREATE_CONTRACTTYPE_SUCCESS:
    case fromContractType.CREATE_CONTRACTTYPE_FAIL:
    case fromContractType.UPDATE_CONTRACTTYPE_FAIL: {
      return { ...state, isSavingLoading: false };
    }

    case fromContractType.UPDATE_CONTRACTTYPE_SUCCESS: {
      const data = action.payload;
      const entities = {
        ...state.entities,
        [data.contractTypeTableHash]: data
      };

      return { ...state, entities, isSavingLoading: false };
    }

    case fromContractType.PAGE_EVENT_CONTRACTTYPE: {
      return {
        ...state,
        pageSize: action.pageSize,
        pageIndex: action.pageIndex
      };
    }

    case fromContractType.SORT_EVENT_CONTRACTTYPE: {
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
