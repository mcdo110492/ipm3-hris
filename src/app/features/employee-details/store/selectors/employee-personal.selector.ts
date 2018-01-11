import { createSelector } from "@ngrx/store";
import * as fromRootDetails from "./../reducers";
import * as fromPersonal from "./../reducers/employee-personal.reducer";

export const getPersonalData = createSelector(
  fromRootDetails.getEmployeeDetailsPersonalState,
  fromPersonal.getPersonalData
);

export const getPersonalIsLoading = createSelector(
  fromRootDetails.getEmployeeDetailsPersonalState,
  fromPersonal.getPersonalIsLoading
);
