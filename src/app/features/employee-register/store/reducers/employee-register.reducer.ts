import * as EmployeeRegisterActions from "./../actions/employee-register.action";
import { EmployeeRegister } from "@app/features/employee-register/models";

export interface State {
  employeeRegister: EmployeeRegister;
}

export const initialState: State = {
  employeeRegister: null
};

export function reducer(
  state: State = initialState,
  action: EmployeeRegisterActions.Actions
): State {
  switch (action.type) {
    case EmployeeRegisterActions.SAVE: {
      const employeeRegister = action.payload;
      return { ...state, employeeRegister };
    }
    case EmployeeRegisterActions.SUBMIT_SUCCESS: {
      return { ...state, employeeRegister: null };
    }
  }

  return state;
}

export const getEmployeeRegisterData = (state: State) => state.employeeRegister;
