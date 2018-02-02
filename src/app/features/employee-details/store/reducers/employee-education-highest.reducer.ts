import * as fromEducationHighest from "./../actions/employee-education-highest.action";
import { EmployeeEducationHighest } from "./../../models/employee-education-highest.model";

export interface State {
  entities: { [id: number]: EmployeeEducationHighest };
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
  action: fromEducationHighest.EducationHighestActions
): State {
  switch (action.type) {
    case fromEducationHighest.LOAD_EDUCATIONHIGHEST: {
      return { ...state, isLoading: true };
    }

    case fromEducationHighest.CLEAR_ENTITIES_EDUCATIONHIGHEST: {
      return { ...state, entities: {} };
    }

    case fromEducationHighest.LOAD_EDUCATIONHIGHEST_SUCCESS: {
      const data = action.payload;
      let entities = data.reduce(
        (
          entities: { [id: number]: EmployeeEducationHighest },
          data: EmployeeEducationHighest
        ) => {
          return {
            ...entities,
            [data.educHighestTableHash]: data
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

    case fromEducationHighest.LOAD_EDUCATIONHIGHEST_FAIL: {
      return { ...state, isLoading: false, isLoaded: false };
    }

    case fromEducationHighest.SELECT_EDUCATIONHIGHEST: {
      return { ...state, selectedEntity: action.payload };
    }

    case fromEducationHighest.CREATE_EDUCATIONHIGHEST: {
      return { ...state, isSavingLoading: true, isLoaded: false };
    }
    case fromEducationHighest.CREATE_EDUCATIONHIGHEST_SUCCESS: {
      const data = action.payload;
      const entities = {
        ...state.entities,
        [data.educHighestTableHash]: data
      };
      return { ...state, entities, isSavingLoading: false };
    }
    case fromEducationHighest.UPDATE_EDUCATIONHIGHEST: {
      return { ...state, isSavingLoading: true };
    }

    case fromEducationHighest.CREATE_EDUCATIONHIGHEST_FAIL:
    case fromEducationHighest.UPDATE_EDUCATIONHIGHEST_FAIL: {
      return { ...state, isSavingLoading: false };
    }

    case fromEducationHighest.UPDATE_EDUCATIONHIGHEST_SUCCESS: {
      const data = action.payload;

      const entities = {
        ...state.entities,
        [data.educHighestTableHash]: data
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
