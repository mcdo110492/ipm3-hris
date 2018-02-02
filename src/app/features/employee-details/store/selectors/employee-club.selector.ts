import { createSelector } from "@ngrx/store";

import * as fromRootDetails from "./../reducers";
import * as fromClub from "./../reducers/employee-club.reducer";

export const getClubEntities = createSelector(
  fromRootDetails.getEmployeeDetailsClubState,
  fromClub.getEntities
);
export const getClubData = createSelector(getClubEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});
export const getClubSelectedEntity = createSelector(
  fromRootDetails.getEmployeeDetailsClubState,
  fromClub.getSelectedEntity
);
export const getClubSelectedEntityData = createSelector(
  getClubEntities,
  getClubSelectedEntity,
  (entities, selectedEntity) => {
    return entities[selectedEntity];
  }
);

export const getClubIsLoading = createSelector(
  fromRootDetails.getEmployeeDetailsClubState,
  fromClub.getIsLoading
);
export const getClubIsLoaded = createSelector(
  fromRootDetails.getEmployeeDetailsClubState,
  fromClub.getIsLoaded
);
export const getClubIsSavingLoading = createSelector(
  fromRootDetails.getEmployeeDetailsClubState,
  fromClub.getIsSavingLoading
);
