import { createSelector } from "@ngrx/store";
import * as fromRootDetails from "./../reducers";
import * as fromContact from "./../reducers/employee-contact.reducer";

export const getContactData = createSelector(
  fromRootDetails.getEmployeeDetailsContactState,
  fromContact.getContactData
);

export const getContactIsLoading = createSelector(
  fromRootDetails.getEmployeeDetailsContactState,
  fromContact.getContactIsLoading
);
