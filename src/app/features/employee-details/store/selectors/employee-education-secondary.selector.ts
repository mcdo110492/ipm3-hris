import { createSelector } from "@ngrx/store";
import * as fromRootDetails from "./../reducers";
import * as fromEducationSecondary from "./../reducers/employee-education-secondary.reducer";

export const getEducationSecondaryData = createSelector(
  fromRootDetails.getEmployeeDetailsEducationSecondaryState,
  fromEducationSecondary.getEducationSecondaryData
);

export const getEducationSecondaryIsLoading = createSelector(
  fromRootDetails.getEmployeeDetailsEducationSecondaryState,
  fromEducationSecondary.getEducationSecondaryIsLoading
);
