import * as fromEducationTertiary from "./../actions/employee-education-tertiary.action";
import { EmployeeEducationTertiary } from "./../../models/employee-education-tertiary.model";

export interface State {
  entities: { [id: number]: EmployeeEducationTertiary };
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
  action: fromEducationTertiary.EducationTertiaryActions
): State {
  switch (action.type) {
    case fromEducationTertiary.LOAD_EDUCATIONTERTIARY: {
      return { ...state, isLoading: true };
    }

    case fromEducationTertiary.CLEAR_ENTITIES_EDUCATIONTERTIARY: {
      return { ...state, entities: {} };
    }

    case fromEducationTertiary.LOAD_EDUCATIONTERTIARY_SUCCESS: {
      const data = action.payload;
      let entities = data.reduce(
        (
          entities: { [id: number]: EmployeeEducationTertiary },
          data: EmployeeEducationTertiary
        ) => {
          return {
            ...entities,
            [data.educTertiaryTableHash]: data
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

    case fromEducationTertiary.LOAD_EDUCATIONTERTIARY_FAIL: {
      return { ...state, isLoading: false, isLoaded: false };
    }

    case fromEducationTertiary.SELECT_EDUCATIONTERTIARY: {
      return { ...state, selectedEntity: action.payload };
    }

    case fromEducationTertiary.CREATE_EDUCATIONTERTIARY: {
      return { ...state, isSavingLoading: true, isLoaded: false };
    }
    case fromEducationTertiary.CREATE_EDUCATIONTERTIARY_SUCCESS: {
      const data = action.payload;
      const entities = {
        ...state.entities,
        [data.educTertiaryTableHash]: data
      };
      return { ...state, entities, isSavingLoading: false };
    }
    case fromEducationTertiary.UPDATE_EDUCATIONTERTIARY: {
      return { ...state, isSavingLoading: true };
    }

    case fromEducationTertiary.CREATE_EDUCATIONTERTIARY_FAIL:
    case fromEducationTertiary.UPDATE_EDUCATIONTERTIARY_FAIL: {
      return { ...state, isSavingLoading: false };
    }

    case fromEducationTertiary.UPDATE_EDUCATIONTERTIARY_SUCCESS: {
      const data = action.payload;

      const entities = {
        ...state.entities,
        [data.educTertiaryTableHash]: data
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
