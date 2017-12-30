import { createSelector } from "@ngrx/store";

import * as fromFeature from "./../reducers";
import * as fromEmployeeStatus from "./../reducers/employee-status.reducer";

export const getEmployeeStatus = createSelector(fromFeature.getEmployeeStatusState, (state : fromFeature.EmployeeStatusState) => state.employeeStatus);

export const getEmployeeStatusPageLength = createSelector(getEmployeeStatus, fromEmployeeStatus.getPageLength );
export const getEmployeeStatusPageSize = createSelector(getEmployeeStatus, fromEmployeeStatus.getPageSize );
export const getEmployeeStatusPageIndex = createSelector(getEmployeeStatus, fromEmployeeStatus.getPageIndex );
export const getEmployeeStatusSortField = createSelector(getEmployeeStatus, fromEmployeeStatus.getSortField );
export const getEmployeeStatusSortDirection = createSelector(getEmployeeStatus, fromEmployeeStatus.getSortDirection );
export const getEmployeeStatusSearchQuery = createSelector(getEmployeeStatus, fromEmployeeStatus.getSearchQuery );
export const getEmployeeStatusEntities = createSelector(getEmployeeStatus, fromEmployeeStatus.getEntities );
export const getEmployeeStatusData = createSelector(getEmployeeStatusEntities,
(entities) => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});
export const getEmployeeStatusSelectedEntity = createSelector(getEmployeeStatus, fromEmployeeStatus.getSelectedEntity );
export const getEmployeeStatusSelectedEntityData = createSelector(getEmployeeStatusEntities,  getEmployeeStatusSelectedEntity,
(entities, selectedEntity) => {
    return entities[selectedEntity];
});

export const getEmployeeStatusIsLoading = createSelector(getEmployeeStatus, fromEmployeeStatus.getIsLoading );
export const getEmployeeStatusIsLoaded = createSelector(getEmployeeStatus, fromEmployeeStatus.getIsLoaded );
export const getEmployeeStatusIsSavingLoading = createSelector(getEmployeeStatus, fromEmployeeStatus.getIsSavingLoading );