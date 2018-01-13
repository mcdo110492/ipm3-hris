import * as fromCompensation from "./../actions/employee-compensation.action";
import { EmployeeCompensation } from "./../../models/employee-compensation.model";

export interface State {
  entities: { [id: number]: EmployeeCompensation };
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
  action: fromCompensation.CompensationActions
): State {
  switch (action.type) {
    case fromCompensation.LOAD_COMPENSATION: {
      return { ...state, isLoading: true };
    }

    case fromCompensation.CLEAR_ENTITIES_COMPENSATION: {
      return { ...state, entities: {} };
    }

    case fromCompensation.LOAD_COMPENSATION_SUCCESS: {
      const data = action.payload;
      let entities = data.reduce(
        (
          entities: { [id: number]: EmployeeCompensation },
          data: EmployeeCompensation
        ) => {
          return {
            ...entities,
            [data.compensationTableHash]: data
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

    case fromCompensation.LOAD_COMPENSATION_FAIL: {
      return { ...state, isLoading: false, isLoaded: false };
    }

    case fromCompensation.SELECT_COMPENSATION: {
      return { ...state, selectedEntity: action.payload };
    }

    case fromCompensation.CREATE_COMPENSATION: {
      return { ...state, isSavingLoading: true, isLoaded: false };
    }
    case fromCompensation.CREATE_COMPENSATION_SUCCESS: {
      const data = action.payload;
      const entities = {
        ...state.entities,
        [data.compensationTableHash]: data
      };
      return { ...state, entities, isSavingLoading: false };
    }
    case fromCompensation.UPDATE_COMPENSATION: {
      return { ...state, isSavingLoading: true };
    }

    case fromCompensation.CREATE_COMPENSATION_FAIL:
    case fromCompensation.UPDATE_COMPENSATION_FAIL: {
      return { ...state, isSavingLoading: false };
    }

    case fromCompensation.UPDATE_COMPENSATION_SUCCESS: {
      const data = action.payload;

      const entities = {
        ...state.entities,
        [data.compensationTableHash]: data
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
