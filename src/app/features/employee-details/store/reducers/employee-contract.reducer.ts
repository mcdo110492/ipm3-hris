import * as fromContract from "./../actions/employee-contract.action";
import { EmployeeContract } from "./../../models/employee-contract.model";

export interface State {
  entities: { [id: number]: EmployeeContract };
  selectedEntity: number;
  isLoading: boolean;
  isLoaded: boolean;
  isSavingLoading: boolean;
}

export const initialState: State = {
  entities: {},
  selectedEntity: null,
  isLoading: false,
  isLoaded: false,
  isSavingLoading: false
};

export function reducer(
  state = initialState,
  action: fromContract.ContractActions
): State {
  switch (action.type) {
    case fromContract.LOAD_CONTRACT: {
      return { ...state, isLoading: true };
    }

    case fromContract.CLEAR_ENTITIES_CONTRACT: {
      return { ...state, entities: {} };
    }

    case fromContract.LOAD_CONTRACT_SUCCESS: {
      const data = action.payload;
      let entities = data.reduce(
        (
          entities: { [id: number]: EmployeeContract },
          data: EmployeeContract
        ) => {
          return {
            ...entities,
            [data.contractTableHash]: data
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
        entities
      };
    }

    case fromContract.LOAD_CONTRACT_FAIL: {
      return { ...state, isLoading: false, isLoaded: false };
    }

    case fromContract.SELECT_CONTRACT: {
      return { ...state, selectedEntity: action.payload };
    }

    case fromContract.CREATE_CONTRACT: {
      return { ...state, isSavingLoading: true, isLoaded: false };
    }
    case fromContract.CREATE_CONTRACT_SUCCESS: {
      const data = action.payload;
      const entities = {
        ...state.entities,
        [data.contractTableHash]: data
      };
      return { ...state, entities, isSavingLoading: false };
    }
    case fromContract.UPDATE_CONTRACT: {
      return { ...state, isSavingLoading: true };
    }

    case fromContract.CREATE_CONTRACT_FAIL:
    case fromContract.UPDATE_CONTRACT_FAIL: {
      return { ...state, isSavingLoading: false };
    }

    case fromContract.UPDATE_CONTRACT_SUCCESS: {
      const data = action.payload;

      const entities = {
        ...state.entities,
        [data.contractTableHash]: data
      };

      return { ...state, entities, isSavingLoading: false };
    }
  }

  return state;
}

export const getEntities = (state: State) => state.entities;
export const getSelectedEntity = (state: State) => state.selectedEntity;
export const getIsLoading = (state: State) => state.isLoading;
export const getIsLoaded = (state: State) => state.isLoaded;
export const getIsSavingLoading = (state: State) => state.isSavingLoading;
