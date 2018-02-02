import * as fromTraining from "./../actions/employee-training.action";
import { EmployeeTraining } from "./../../models/employee-training.model";

export interface State {
  entities: { [id: number]: EmployeeTraining };
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
  action: fromTraining.TrainingActions
): State {
  switch (action.type) {
    case fromTraining.LOAD_TRAINING: {
      return { ...state, isLoading: true };
    }

    case fromTraining.CLEAR_ENTITIES_TRAINING: {
      return { ...state, entities: {} };
    }

    case fromTraining.LOAD_TRAINING_SUCCESS: {
      const data = action.payload;
      let entities = data.reduce(
        (
          entities: { [id: number]: EmployeeTraining },
          data: EmployeeTraining
        ) => {
          return {
            ...entities,
            [data.trainingTableHash]: data
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

    case fromTraining.LOAD_TRAINING_FAIL: {
      return { ...state, isLoading: false, isLoaded: false };
    }

    case fromTraining.SELECT_TRAINING: {
      return { ...state, selectedEntity: action.payload };
    }

    case fromTraining.CREATE_TRAINING: {
      return { ...state, isSavingLoading: true, isLoaded: false };
    }
    case fromTraining.CREATE_TRAINING_SUCCESS: {
      const data = action.payload;
      const entities = {
        ...state.entities,
        [data.trainingTableHash]: data
      };
      return { ...state, entities, isSavingLoading: false };
    }
    case fromTraining.UPDATE_TRAINING: {
      return { ...state, isSavingLoading: true };
    }

    case fromTraining.CREATE_TRAINING_FAIL:
    case fromTraining.UPDATE_TRAINING_FAIL: {
      return { ...state, isSavingLoading: false };
    }

    case fromTraining.UPDATE_TRAINING_SUCCESS: {
      const data = action.payload;

      const entities = {
        ...state.entities,
        [data.trainingTableHash]: data
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
