import { createSelector } from "@ngrx/store";

import * as fromFeature from "./../reducers";
import * as fromUserManagement from "./../reducers/user-management.reducer";

export const getUserManagement = createSelector(
  fromFeature.getUserManagementState,
  (state: fromFeature.UserManagementState) => state.userManagement
);

export const getUserManagementPageLength = createSelector(
  getUserManagement,
  fromUserManagement.getPageLength
);
export const getUserManagementPageSize = createSelector(
  getUserManagement,
  fromUserManagement.getPageSize
);
export const getUserManagementPageIndex = createSelector(
  getUserManagement,
  fromUserManagement.getPageIndex
);
export const getUserManagementSortField = createSelector(
  getUserManagement,
  fromUserManagement.getSortField
);
export const getUserManagementSortDirection = createSelector(
  getUserManagement,
  fromUserManagement.getSortDirection
);
export const getUserManagementSearchQuery = createSelector(
  getUserManagement,
  fromUserManagement.getSearchQuery
);
export const getUserManagementEntities = createSelector(
  getUserManagement,
  fromUserManagement.getEntities
);
export const getUserManagementData = createSelector(
  getUserManagementEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);

export const getUserManagementIsLoading = createSelector(
  getUserManagement,
  fromUserManagement.getIsLoading
);
export const getUserManagementIsLoaded = createSelector(
  getUserManagement,
  fromUserManagement.getIsLoaded
);

export const getIsSavingLoading = createSelector(
  getUserManagement,
  fromUserManagement.getIsSavingLoading
);
