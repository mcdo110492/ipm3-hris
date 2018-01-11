import { createSelector } from "@ngrx/store";
import * as fromRootDetails from "./../reducers";
import * as fromGovernment from "./../reducers/employee-government.reducer";

export const getGovernmentData = createSelector(
  fromRootDetails.getEmployeeDetailsGovernmentState,
  fromGovernment.getGovernmentData
);

export const getGovernmentIsLoading = createSelector(
  fromRootDetails.getEmployeeDetailsGovernmentState,
  fromGovernment.getGovernmentIsLoading
);
