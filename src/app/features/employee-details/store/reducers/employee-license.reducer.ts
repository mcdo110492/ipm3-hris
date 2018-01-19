import * as fromLicense from "./../actions/employee-license.action";
import { EmployeeLicense } from "./../../models/employee-license.model";

export interface State {
  entities: { [id: number]: EmployeeLicense };
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
  action: fromLicense.LicenseActions
): State {
  switch (action.type) {
    case fromLicense.LOAD_LICENSE: {
      return { ...state, isLoading: true };
    }

    case fromLicense.CLEAR_ENTITIES_LICENSE: {
      return { ...state, entities: {} };
    }

    case fromLicense.LOAD_LICENSE_SUCCESS: {
      const data = action.payload;
      let entities = data.reduce(
        (
          entities: { [id: number]: EmployeeLicense },
          data: EmployeeLicense
        ) => {
          return {
            ...entities,
            [data.licenseTableHash]: data
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

    case fromLicense.LOAD_LICENSE_FAIL: {
      return { ...state, isLoading: false, isLoaded: false };
    }

    case fromLicense.SELECT_LICENSE: {
      return { ...state, selectedEntity: action.payload };
    }

    case fromLicense.CREATE_LICENSE: {
      return { ...state, isSavingLoading: true, isLoaded: false };
    }
    case fromLicense.CREATE_LICENSE_SUCCESS: {
      const data = action.payload;
      const entities = {
        ...state.entities,
        [data.licenseTableHash]: data
      };
      return { ...state, entities, isSavingLoading: false };
    }
    case fromLicense.UPDATE_LICENSE: {
      return { ...state, isSavingLoading: true };
    }

    case fromLicense.CREATE_LICENSE_FAIL:
    case fromLicense.UPDATE_LICENSE_FAIL: {
      return { ...state, isSavingLoading: false };
    }

    case fromLicense.UPDATE_LICENSE_SUCCESS: {
      const data = action.payload;
      const entities = {
        ...state.entities,
        [data.licenseTableHash]: data
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
