import * as fromPosition from "./../actions/position.action";
import { Position } from "./../../models/position.model";

export interface State {
  pageLength: number;
  pageSize: number;
  pageIndex: number;
  sortField: string;
  sortDirection: string;
  searchQuery: string;
  entities: { [id: number]: Position };
  selectedEntity: number;
  isLoading: boolean;
  isLoaded: boolean;
  isSavingLoading: boolean;
}

export const initialState: State = {
  pageLength: 0,
  pageSize: 5,
  pageIndex: 0,
  sortField: "positionCode",
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
  action: fromPosition.PositionActions
): State {
  switch (action.type) {
    case fromPosition.LOAD_POSITION: {
      return { ...state, isLoading: true };
    }

    case fromPosition.CLEAR_ENTITIES_POSITION: {
      return { ...state, entities: {} };
    }

    case fromPosition.LOAD_POSITION_SUCCESS: {
      const { data, count } = action.payload;
      let entities = data.reduce(
        (entities: { [id: number]: Position }, data: Position) => {
          return {
            ...entities,
            [data.positionTableHash]: data
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

    case fromPosition.LOAD_POSITION_FAIL: {
      return { ...state, isLoading: false, isLoaded: false };
    }

    case fromPosition.SEARCH_POSITION: {
      return {
        ...state,
        isLoading: true,
        searchQuery: action.payload,
        isLoaded: false
      };
    }

    case fromPosition.SELECT_POSITION: {
      return { ...state, selectedEntity: action.payload };
    }

    case fromPosition.CREATE_POSITION: {
      return { ...state, isSavingLoading: true, isLoaded: false };
    }
    case fromPosition.UPDATE_POSITION: {
      return { ...state, isSavingLoading: true };
    }

    case fromPosition.CREATE_POSITION_SUCCESS:
    case fromPosition.CREATE_POSITION_FAIL:
    case fromPosition.UPDATE_POSITION_FAIL: {
      return { ...state, isSavingLoading: false };
    }

    case fromPosition.UPDATE_POSITION_SUCCESS: {
      const data = action.payload;
      const entities = {
        ...state.entities,
        [data.positionTableHash]: data
      };

      return { ...state, entities, isSavingLoading: false };
    }

    case fromPosition.PAGE_EVENT_POSITION: {
      return {
        ...state,
        pageSize: action.pageSize,
        pageIndex: action.pageIndex,
        isLoaded: false
      };
    }

    case fromPosition.SORT_EVENT_POSITION: {
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
