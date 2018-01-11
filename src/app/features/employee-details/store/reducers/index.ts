import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";
import * as fromPersonal from "./employee-personal.reducer";
import * as fromEmployment from "./employee-employment.reducer";
import * as fromContact from "./employee-contact.reducer";
import * as fromGovernment from "./employee-government.reducer";

export interface State {
  personal: fromPersonal.State;
  employment: fromEmployment.State;
  contact: fromContact.State;
  government: fromGovernment.State;
}

export const reducer: ActionReducerMap<State> = {
  personal: fromPersonal.reducer,
  employment: fromEmployment.reducer,
  contact: fromContact.reducer,
  government: fromGovernment.reducer
};

export const getEmployeeDetailsState = createFeatureSelector<State>(
  "employeeDetails"
);

export const getEmployeeDetailsPersonalState = createSelector(
  getEmployeeDetailsState,
  (state: State) => state.personal
);

export const getEmployeeDetailsEmploymentState = createSelector(
  getEmployeeDetailsState,
  (state: State) => state.employment
);

export const getEmployeeDetailsContactState = createSelector(
  getEmployeeDetailsState,
  (state: State) => state.contact
);

export const getEmployeeDetailsGovernmentState = createSelector(
  getEmployeeDetailsState,
  (state: State) => state.government
);
