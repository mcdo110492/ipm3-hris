import { createSelector } from "@ngrx/store";
import * as fromRootDetails from "./../reducers";
import * as fromEmployment from "./../reducers/employee-employment.reducer";

export const getEmploymentData = createSelector(
  fromRootDetails.getEmployeeDetailsEmploymentState,
  fromEmployment.getEmploymentData
);

export const getEmploymentIsLoading = createSelector(
  fromRootDetails.getEmployeeDetailsEmploymentState,
  fromEmployment.getEmploymentIsLoading
);
