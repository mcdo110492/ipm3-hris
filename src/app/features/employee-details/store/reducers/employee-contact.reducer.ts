import * as ContactActions from "./../actions/employee-contact.action";
import { EmployeeContact } from "./../../models/employee-contact.model";

export interface State {
  data: EmployeeContact;
  isLoading: boolean;
}

export const initialState: State = {
  data: null,
  isLoading: false
};

export function reducer(
  state = initialState,
  action: ContactActions.ContactActions
): State {
  switch (action.type) {
    case ContactActions.LOAD_CONTACT_INFO:
    case ContactActions.SAVE_CONTACT_INFO: {
      return { ...state, isLoading: true };
    }
    case ContactActions.LOAD_CONTACT_INFO_SUCCESS:
    case ContactActions.SAVE_CONTACT_INFO_SUCCESS: {
      const { payload } = action;
      return { ...state, data: payload, isLoading: false };
    }
    case ContactActions.LOAD_CONTACT_INFO_FAIL:
    case ContactActions.SAVE_CONTACT_INFO_FAIL: {
      return { ...state, isLoading: false };
    }
  }

  return state;
}

export const getContactData = (state: State) => state.data;
export const getContactIsLoading = (state: State) => state.isLoading;
