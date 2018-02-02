import { createSelector } from "@ngrx/store";
import * as fromRootDetails from "./../reducers";
import * as fromHealth from "./../reducers/employee-health.reducer";

export const getHealthData = createSelector(
  fromRootDetails.getEmployeeDetailsHealthState,
  fromHealth.getHealthData
);

export const getHealthIsLoading = createSelector(
  fromRootDetails.getEmployeeDetailsHealthState,
  fromHealth.getHealthIsLoading
);
