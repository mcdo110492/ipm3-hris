import * as fromClub from "./../actions/employee-club.action";
import { EmployeeClub } from "./../../models/employee-club.model";

export interface State {
  entities: { [id: number]: EmployeeClub };
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
  action: fromClub.ClubActions
): State {
  switch (action.type) {
    case fromClub.LOAD_CLUB: {
      return { ...state, isLoading: true };
    }

    case fromClub.CLEAR_ENTITIES_CLUB: {
      return { ...state, entities: {} };
    }

    case fromClub.LOAD_CLUB_SUCCESS: {
      const data = action.payload;
      let entities = data.reduce(
        (entities: { [id: number]: EmployeeClub }, data: EmployeeClub) => {
          return {
            ...entities,
            [data.clubTableHash]: data
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

    case fromClub.LOAD_CLUB_FAIL: {
      return { ...state, isLoading: false, isLoaded: false };
    }

    case fromClub.SELECT_CLUB: {
      return { ...state, selectedEntity: action.payload };
    }

    case fromClub.CREATE_CLUB: {
      return { ...state, isSavingLoading: true, isLoaded: false };
    }
    case fromClub.CREATE_CLUB_SUCCESS: {
      const data = action.payload;
      const entities = {
        ...state.entities,
        [data.clubTableHash]: data
      };
      return { ...state, entities, isSavingLoading: false };
    }
    case fromClub.UPDATE_CLUB: {
      return { ...state, isSavingLoading: true };
    }

    case fromClub.CREATE_CLUB_FAIL:
    case fromClub.UPDATE_CLUB_FAIL: {
      return { ...state, isSavingLoading: false };
    }

    case fromClub.UPDATE_CLUB_SUCCESS: {
      const data = action.payload;

      const entities = {
        ...state.entities,
        [data.clubTableHash]: data
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
