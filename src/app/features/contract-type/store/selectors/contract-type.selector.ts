import { createSelector } from "@ngrx/store";

import * as fromFeature from "./../reducers";
import * as fromContractType from "./../reducers/contract-type.reducer";

export const getContractType = createSelector(fromFeature.getContractTypeState, (state : fromFeature.ContractTypeState) => state.contractType);

export const getContractTypePageLength = createSelector(getContractType, fromContractType.getPageLength );
export const getContractTypePageSize = createSelector(getContractType, fromContractType.getPageSize );
export const getContractTypePageIndex = createSelector(getContractType, fromContractType.getPageIndex );
export const getContractTypeSortField = createSelector(getContractType, fromContractType.getSortField );
export const getContractTypeSortDirection = createSelector(getContractType, fromContractType.getSortDirection );
export const getContractTypeSearchQuery = createSelector(getContractType, fromContractType.getSearchQuery );
export const getContractTypeEntities = createSelector(getContractType, fromContractType.getEntities );
export const getContractTypeData = createSelector(getContractTypeEntities,
(entities) => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});
export const getContractTypeSelectedEntity = createSelector(getContractType, fromContractType.getSelectedEntity );
export const getContractTypeSelectedEntityData = createSelector(getContractTypeEntities,  getContractTypeSelectedEntity,
(entities, selectedEntity) => {
    return entities[selectedEntity];
});

export const getContractTypeIsLoading = createSelector(getContractType, fromContractType.getIsLoading );
export const getContractTypeIsLoaded = createSelector(getContractType, fromContractType.getIsLoaded );
export const getContractTypeIsSavingLoading = createSelector(getContractType, fromContractType.getIsSavingLoading );