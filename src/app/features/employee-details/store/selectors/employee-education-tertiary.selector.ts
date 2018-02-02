import { createSelector } from "@ngrx/store";

import * as fromRootDetails from "./../reducers";
import * as fromEducationTertiary from "./../reducers/employee-education-tertiary.reducer";

export const getEducationTertiaryEntities = createSelector(
  fromRootDetails.getEmployeeDetailsEducationTertiaryState,
  fromEducationTertiary.getEntities
);
export const getEducationTertiaryData = createSelector(
  getEducationTertiaryEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);
export const getEducationTertiarySelectedEntity = createSelector(
  fromRootDetails.getEmployeeDetailsEducationTertiaryState,
  fromEducationTertiary.getSelectedEntity
);
export const getEducationTertiarySelectedEntityData = createSelector(
  getEducationTertiaryEntities,
  getEducationTertiarySelectedEntity,
  (entities, selectedEntity) => {
    return entities[selectedEntity];
  }
);

export const getEducationTertiaryIsLoading = createSelector(
  fromRootDetails.getEmployeeDetailsEducationTertiaryState,
  fromEducationTertiary.getIsLoading
);
export const getEducationTertiaryIsLoaded = createSelector(
  fromRootDetails.getEmployeeDetailsEducationTertiaryState,
  fromEducationTertiary.getIsLoaded
);
export const getEducationTertiaryIsSavingLoading = createSelector(
  fromRootDetails.getEmployeeDetailsEducationTertiaryState,
  fromEducationTertiary.getIsSavingLoading
);
