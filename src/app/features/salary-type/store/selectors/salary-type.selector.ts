import { createSelector } from "@ngrx/store";

import * as fromFeature from "./../reducers";
import * as fromSalaryType from "./../reducers/salary-type.reducer";

export const getSalaryType = createSelector(fromFeature.getSalaryTypeState, (state : fromFeature.SalaryTypeState) => state.salaryType);

export const getSalaryTypePageLength = createSelector(getSalaryType, fromSalaryType.getPageLength );
export const getSalaryTypePageSize = createSelector(getSalaryType, fromSalaryType.getPageSize );
export const getSalaryTypePageIndex = createSelector(getSalaryType, fromSalaryType.getPageIndex );
export const getSalaryTypeSortField = createSelector(getSalaryType, fromSalaryType.getSortField );
export const getSalaryTypeSortDirection = createSelector(getSalaryType, fromSalaryType.getSortDirection );
export const getSalaryTypeSearchQuery = createSelector(getSalaryType, fromSalaryType.getSearchQuery );
export const getSalaryTypeEntities = createSelector(getSalaryType, fromSalaryType.getEntities );
export const getSalaryTypeData = createSelector(getSalaryTypeEntities,
(entities) => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});
export const getSalaryTypeSelectedEntity = createSelector(getSalaryType, fromSalaryType.getSelectedEntity );
export const getSalaryTypeSelectedEntityData = createSelector(getSalaryTypeEntities,  getSalaryTypeSelectedEntity,
(entities, selectedEntity) => {
    return entities[selectedEntity];
});

export const getSalaryTypeIsLoading = createSelector(getSalaryType, fromSalaryType.getIsLoading );
export const getSalaryTypeIsLoaded = createSelector(getSalaryType, fromSalaryType.getIsLoaded );
export const getSalaryTypeIsSavingLoading = createSelector(getSalaryType, fromSalaryType.getIsSavingLoading );