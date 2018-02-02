import { createSelector } from "@ngrx/store";

import * as fromRootDetails from "./../reducers";
import * as fromContract from "./../reducers/employee-contract.reducer";

export const getContractEntities = createSelector(
  fromRootDetails.getEmployeeDetailsContractState,
  fromContract.getEntities
);
export const getContractData = createSelector(getContractEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});
export const getContractSelectedEntity = createSelector(
  fromRootDetails.getEmployeeDetailsContractState,
  fromContract.getSelectedEntity
);
export const getContractSelectedEntityData = createSelector(
  getContractEntities,
  getContractSelectedEntity,
  (entities, selectedEntity) => {
    return entities[selectedEntity];
  }
);

export const getContractIsLoading = createSelector(
  fromRootDetails.getEmployeeDetailsContractState,
  fromContract.getIsLoading
);
export const getContractIsLoaded = createSelector(
  fromRootDetails.getEmployeeDetailsContractState,
  fromContract.getIsLoaded
);
export const getContractIsSavingLoading = createSelector(
  fromRootDetails.getEmployeeDetailsContractState,
  fromContract.getIsSavingLoading
);
