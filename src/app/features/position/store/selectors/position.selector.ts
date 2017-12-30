import { createSelector } from "@ngrx/store";

import * as fromFeature from "./../reducers";
import * as fromPosition from "./../reducers/position.reducer";

export const getPosition = createSelector(fromFeature.getPositionState, (state : fromFeature.PositionState) => state.position);

export const getPositionPageLength = createSelector(getPosition, fromPosition.getPageLength );
export const getPositionPageSize = createSelector(getPosition, fromPosition.getPageSize );
export const getPositionPageIndex = createSelector(getPosition, fromPosition.getPageIndex );
export const getPositionSortField = createSelector(getPosition, fromPosition.getSortField );
export const getPositionSortDirection = createSelector(getPosition, fromPosition.getSortDirection );
export const getPositionSearchQuery = createSelector(getPosition, fromPosition.getSearchQuery );
export const getPositionEntities = createSelector(getPosition, fromPosition.getEntities );
export const getPositionData = createSelector(getPositionEntities,
(entities) => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});
export const getPositionSelectedEntity = createSelector(getPosition, fromPosition.getSelectedEntity );
export const getPositionSelectedEntityData = createSelector(getPositionEntities,  getPositionSelectedEntity,
(entities, selectedEntity) => {
    return entities[selectedEntity];
});

export const getPositionIsLoading = createSelector(getPosition, fromPosition.getIsLoading );
export const getPositionIsLoaded = createSelector(getPosition, fromPosition.getIsLoaded );
export const getPositionIsSavingLoading = createSelector(getPosition, fromPosition.getIsSavingLoading );