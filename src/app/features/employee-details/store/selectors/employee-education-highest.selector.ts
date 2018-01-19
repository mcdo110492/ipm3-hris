import { createSelector } from "@ngrx/store";

import * as fromRootDetails from "./../reducers";
import * as fromEducationHighest from "./../reducers/employee-education-highest.reducer";

export const getEducationHighestEntities = createSelector(
  fromRootDetails.getEmployeeDetailsEducationHighestState,
  fromEducationHighest.getEntities
);
export const getEducationHighestData = createSelector(
  getEducationHighestEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);
export const getEducationHighestSelectedEntity = createSelector(
  fromRootDetails.getEmployeeDetailsEducationHighestState,
  fromEducationHighest.getSelectedEntity
);
export const getEducationHighestSelectedEntityData = createSelector(
  getEducationHighestEntities,
  getEducationHighestSelectedEntity,
  (entities, selectedEntity) => {
    return entities[selectedEntity];
  }
);

export const getEducationHighestIsLoading = createSelector(
  fromRootDetails.getEmployeeDetailsEducationHighestState,
  fromEducationHighest.getIsLoading
);
export const getEducationHighestIsLoaded = createSelector(
  fromRootDetails.getEmployeeDetailsEducationHighestState,
  fromEducationHighest.getIsLoaded
);
export const getEducationHighestIsSavingLoading = createSelector(
  fromRootDetails.getEmployeeDetailsEducationHighestState,
  fromEducationHighest.getIsSavingLoading
);
