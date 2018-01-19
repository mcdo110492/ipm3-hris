import { createSelector } from "@ngrx/store";
import * as fromRootDetails from "./../reducers";
import * as fromEducationPrimary from "./../reducers/employee-education-primary.reducer";

export const getEducationPrimaryData = createSelector(
  fromRootDetails.getEmployeeDetailsEducationPrimaryState,
  fromEducationPrimary.getEducationPrimaryData
);

export const getEducationPrimaryIsLoading = createSelector(
  fromRootDetails.getEmployeeDetailsEducationPrimaryState,
  fromEducationPrimary.getEducationPrimaryIsLoading
);
