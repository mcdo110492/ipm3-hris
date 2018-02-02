import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";
import * as fromPersonal from "./employee-personal.reducer";
import * as fromEmployment from "./employee-employment.reducer";
import * as fromContact from "./employee-contact.reducer";
import * as fromGovernment from "./employee-government.reducer";
import * as fromHealth from "./employee-health.reducer";
import * as fromCompensation from "./employee-compensation.reducer";
import * as fromLicense from "./employee-license.reducer";
import * as fromTraining from "./employee-training.reducer";
import * as fromClub from "./employee-club.reducer";
import * as fromEducationTertiary from "./employee-education-tertiary.reducer";
import * as fromEducationHighest from "./employee-education-highest.reducer";
import * as fromEducationVocational from "./employee-education-vocational.reducer";
import * as fromEducationSecondary from "./employee-education-secondary.reducer";
import * as fromEducationPrimary from "./employee-education-primary.reducer";
import * as fromContract from "./employee-contract.reducer";

export interface State {
  personal: fromPersonal.State;
  employment: fromEmployment.State;
  contact: fromContact.State;
  government: fromGovernment.State;
  health: fromHealth.State;
  compensation: fromCompensation.State;
  contract: fromContract.State;
  license: fromLicense.State;
  training: fromTraining.State;
  club: fromClub.State;
  educationTertiary: fromEducationTertiary.State;
  educationHighest: fromEducationHighest.State;
  educationVocational: fromEducationVocational.State;
  educationSecondary: fromEducationSecondary.State;
  educationPrimary: fromEducationPrimary.State;
}

export const reducer: ActionReducerMap<State> = {
  personal: fromPersonal.reducer,
  employment: fromEmployment.reducer,
  contact: fromContact.reducer,
  government: fromGovernment.reducer,
  health: fromHealth.reducer,
  compensation: fromCompensation.reducer,
  contract: fromContract.reducer,
  license: fromLicense.reducer,
  training: fromTraining.reducer,
  club: fromClub.reducer,
  educationTertiary: fromEducationTertiary.reducer,
  educationHighest: fromEducationHighest.reducer,
  educationVocational: fromEducationVocational.reducer,
  educationSecondary: fromEducationSecondary.reducer,
  educationPrimary: fromEducationPrimary.reducer
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

export const getEmployeeDetailsHealthState = createSelector(
  getEmployeeDetailsState,
  (state: State) => state.health
);

export const getEmployeeDetailsCompensationState = createSelector(
  getEmployeeDetailsState,
  (state: State) => state.compensation
);

export const getEmployeeDetailsContractState = createSelector(
  getEmployeeDetailsState,
  (state: State) => state.contract
);

export const getEmployeeDetailsLicenseState = createSelector(
  getEmployeeDetailsState,
  (state: State) => state.license
);

export const getEmployeeDetailsTrainingState = createSelector(
  getEmployeeDetailsState,
  (state: State) => state.training
);

export const getEmployeeDetailsClubState = createSelector(
  getEmployeeDetailsState,
  (state: State) => state.club
);

export const getEmployeeDetailsEducationTertiaryState = createSelector(
  getEmployeeDetailsState,
  (state: State) => state.educationTertiary
);

export const getEmployeeDetailsEducationHighestState = createSelector(
  getEmployeeDetailsState,
  (state: State) => state.educationHighest
);

export const getEmployeeDetailsEducationVocationalState = createSelector(
  getEmployeeDetailsState,
  (state: State) => state.educationVocational
);

export const getEmployeeDetailsEducationSecondaryState = createSelector(
  getEmployeeDetailsState,
  (state: State) => state.educationSecondary
);

export const getEmployeeDetailsEducationPrimaryState = createSelector(
  getEmployeeDetailsState,
  (state: State) => state.educationPrimary
);
