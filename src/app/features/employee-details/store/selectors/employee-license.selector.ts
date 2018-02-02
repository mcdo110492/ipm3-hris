import { createSelector } from "@ngrx/store";

import * as fromRootDetails from "./../reducers";
import * as fromLicense from "./../reducers/employee-license.reducer";

export const getLicenseEntities = createSelector(
  fromRootDetails.getEmployeeDetailsLicenseState,
  fromLicense.getEntities
);
export const getLicenseData = createSelector(getLicenseEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});
export const getLicenseSelectedEntity = createSelector(
  fromRootDetails.getEmployeeDetailsLicenseState,
  fromLicense.getSelectedEntity
);
export const getLicenseSelectedEntityData = createSelector(
  getLicenseEntities,
  getLicenseSelectedEntity,
  (entities, selectedEntity) => {
    return entities[selectedEntity];
  }
);

export const getLicenseIsLoading = createSelector(
  fromRootDetails.getEmployeeDetailsLicenseState,
  fromLicense.getIsLoading
);
export const getLicenseIsLoaded = createSelector(
  fromRootDetails.getEmployeeDetailsLicenseState,
  fromLicense.getIsLoaded
);
export const getLicenseIsSavingLoading = createSelector(
  fromRootDetails.getEmployeeDetailsLicenseState,
  fromLicense.getIsSavingLoading
);
