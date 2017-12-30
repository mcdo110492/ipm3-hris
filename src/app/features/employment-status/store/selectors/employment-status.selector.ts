import { createSelector } from "@ngrx/store";

import * as fromFeature from "./../reducers";
import * as fromEmploymentStatus from "./../reducers/employment-status.reducer";

export const getEmploymentStatus = createSelector(
  fromFeature.getEmploymentStatusState,
  (state: fromFeature.EmploymentStatusState) => state.employmentStatus
);

export const getEmploymentStatusPageLength = createSelector(
  getEmploymentStatus,
  fromEmploymentStatus.getPageLength
);
export const getEmploymentStatusPageSize = createSelector(
  getEmploymentStatus,
  fromEmploymentStatus.getPageSize
);
export const getEmploymentStatusPageIndex = createSelector(
  getEmploymentStatus,
  fromEmploymentStatus.getPageIndex
);
export const getEmploymentStatusSortField = createSelector(
  getEmploymentStatus,
  fromEmploymentStatus.getSortField
);
export const getEmploymentStatusSortDirection = createSelector(
  getEmploymentStatus,
  fromEmploymentStatus.getSortDirection
);
export const getEmploymentStatusSearchQuery = createSelector(
  getEmploymentStatus,
  fromEmploymentStatus.getSearchQuery
);
export const getEmploymentStatusEntities = createSelector(
  getEmploymentStatus,
  fromEmploymentStatus.getEntities
);
export const getEmploymentStatusData = createSelector(
  getEmploymentStatusEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);
export const getEmploymentStatusSelectedEntity = createSelector(
  getEmploymentStatus,
  fromEmploymentStatus.getSelectedEntity
);
export const getEmploymentStatusSelectedEntityData = createSelector(
  getEmploymentStatusEntities,
  getEmploymentStatusSelectedEntity,
  (entities, selectedEntity) => {
    return entities[selectedEntity];
  }
);

export const getEmploymentStatusIsLoading = createSelector(
  getEmploymentStatus,
  fromEmploymentStatus.getIsLoading
);
export const getEmploymentStatusIsLoaded = createSelector(
  getEmploymentStatus,
  fromEmploymentStatus.getIsLoaded
);
export const getEmploymentStatusIsSavingLoading = createSelector(
  getEmploymentStatus,
  fromEmploymentStatus.getIsSavingLoading
);
