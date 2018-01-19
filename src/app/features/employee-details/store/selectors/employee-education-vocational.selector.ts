import { createSelector } from "@ngrx/store";

import * as fromRootDetails from "./../reducers";
import * as fromEducationVocational from "./../reducers/employee-education-vocational.reducer";

export const getEducationVocationalEntities = createSelector(
  fromRootDetails.getEmployeeDetailsEducationVocationalState,
  fromEducationVocational.getEntities
);
export const getEducationVocationalData = createSelector(
  getEducationVocationalEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);
export const getEducationVocationalSelectedEntity = createSelector(
  fromRootDetails.getEmployeeDetailsEducationVocationalState,
  fromEducationVocational.getSelectedEntity
);
export const getEducationVocationalSelectedEntityData = createSelector(
  getEducationVocationalEntities,
  getEducationVocationalSelectedEntity,
  (entities, selectedEntity) => {
    return entities[selectedEntity];
  }
);

export const getEducationVocationalIsLoading = createSelector(
  fromRootDetails.getEmployeeDetailsEducationVocationalState,
  fromEducationVocational.getIsLoading
);
export const getEducationVocationalIsLoaded = createSelector(
  fromRootDetails.getEmployeeDetailsEducationVocationalState,
  fromEducationVocational.getIsLoaded
);
export const getEducationVocationalIsSavingLoading = createSelector(
  fromRootDetails.getEmployeeDetailsEducationVocationalState,
  fromEducationVocational.getIsSavingLoading
);
