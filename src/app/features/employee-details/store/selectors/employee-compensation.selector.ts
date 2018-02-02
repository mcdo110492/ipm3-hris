import { createSelector } from "@ngrx/store";

import * as fromRootDetails from "./../reducers";
import * as fromCompensation from "./../reducers/employee-compensation.reducer";

export const getCompensationEntities = createSelector(
  fromRootDetails.getEmployeeDetailsCompensationState,
  fromCompensation.getEntities
);
export const getCompensationData = createSelector(
  getCompensationEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);
export const getCompensationSelectedEntity = createSelector(
  fromRootDetails.getEmployeeDetailsCompensationState,
  fromCompensation.getSelectedEntity
);
export const getCompensationSelectedEntityData = createSelector(
  getCompensationEntities,
  getCompensationSelectedEntity,
  (entities, selectedEntity) => {
    return entities[selectedEntity];
  }
);

export const getCompensationIsLoading = createSelector(
  fromRootDetails.getEmployeeDetailsCompensationState,
  fromCompensation.getIsLoading
);
export const getCompensationIsLoaded = createSelector(
  fromRootDetails.getEmployeeDetailsCompensationState,
  fromCompensation.getIsLoaded
);
export const getCompensationIsSavingLoading = createSelector(
  fromRootDetails.getEmployeeDetailsCompensationState,
  fromCompensation.getIsSavingLoading
);
