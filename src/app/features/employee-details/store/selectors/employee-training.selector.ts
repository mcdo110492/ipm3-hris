import { createSelector } from "@ngrx/store";

import * as fromRootDetails from "./../reducers";
import * as fromTraining from "./../reducers/employee-training.reducer";

export const getTrainingEntities = createSelector(
  fromRootDetails.getEmployeeDetailsTrainingState,
  fromTraining.getEntities
);
export const getTrainingData = createSelector(getTrainingEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});
export const getTrainingSelectedEntity = createSelector(
  fromRootDetails.getEmployeeDetailsTrainingState,
  fromTraining.getSelectedEntity
);
export const getTrainingSelectedEntityData = createSelector(
  getTrainingEntities,
  getTrainingSelectedEntity,
  (entities, selectedEntity) => {
    return entities[selectedEntity];
  }
);

export const getTrainingIsLoading = createSelector(
  fromRootDetails.getEmployeeDetailsTrainingState,
  fromTraining.getIsLoading
);
export const getTrainingIsLoaded = createSelector(
  fromRootDetails.getEmployeeDetailsTrainingState,
  fromTraining.getIsLoaded
);
export const getTrainingIsSavingLoading = createSelector(
  fromRootDetails.getEmployeeDetailsTrainingState,
  fromTraining.getIsSavingLoading
);
