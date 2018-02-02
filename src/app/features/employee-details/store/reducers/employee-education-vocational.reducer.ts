import * as fromEducationVocational from "./../actions/employee-education-vocational.action";
import { EmployeeEducationVocational } from "./../../models/employee-education-vocational.model";

export interface State {
  entities: { [id: number]: EmployeeEducationVocational };
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
  action: fromEducationVocational.EducationVocationalActions
): State {
  switch (action.type) {
    case fromEducationVocational.LOAD_EDUCATIONVOCATIONAL: {
      return { ...state, isLoading: true };
    }

    case fromEducationVocational.CLEAR_ENTITIES_EDUCATIONVOCATIONAL: {
      return { ...state, entities: {} };
    }

    case fromEducationVocational.LOAD_EDUCATIONVOCATIONAL_SUCCESS: {
      const data = action.payload;
      let entities = data.reduce(
        (
          entities: { [id: number]: EmployeeEducationVocational },
          data: EmployeeEducationVocational
        ) => {
          return {
            ...entities,
            [data.educVocationalTableHash]: data
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

    case fromEducationVocational.LOAD_EDUCATIONVOCATIONAL_FAIL: {
      return { ...state, isLoading: false, isLoaded: false };
    }

    case fromEducationVocational.SELECT_EDUCATIONVOCATIONAL: {
      return { ...state, selectedEntity: action.payload };
    }

    case fromEducationVocational.CREATE_EDUCATIONVOCATIONAL: {
      return { ...state, isSavingLoading: true, isLoaded: false };
    }
    case fromEducationVocational.CREATE_EDUCATIONVOCATIONAL_SUCCESS: {
      const data = action.payload;
      const entities = {
        ...state.entities,
        [data.educVocationalTableHash]: data
      };
      return { ...state, entities, isSavingLoading: false };
    }
    case fromEducationVocational.UPDATE_EDUCATIONVOCATIONAL: {
      return { ...state, isSavingLoading: true };
    }

    case fromEducationVocational.CREATE_EDUCATIONVOCATIONAL_FAIL:
    case fromEducationVocational.UPDATE_EDUCATIONVOCATIONAL_FAIL: {
      return { ...state, isSavingLoading: false };
    }

    case fromEducationVocational.UPDATE_EDUCATIONVOCATIONAL_SUCCESS: {
      const data = action.payload;

      const entities = {
        ...state.entities,
        [data.educVocationalTableHash]: data
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
