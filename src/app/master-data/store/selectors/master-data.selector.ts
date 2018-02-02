import { createSelector } from "@ngrx/store";

import * as fromFeature from "./../reducers";
import * as fromMasterData from "./../reducers/master-data.reducer";

export const getMasterData = createSelector(
  fromFeature.getMasterDataState,
  (state: fromFeature.MasterDataState) => state.masterData
);

export const getProjects = createSelector(
  getMasterData,
  fromMasterData.getAllProjects
);
export const getPositions = createSelector(
  getMasterData,
  fromMasterData.getAllPositions
);

export const getEmploymentStatus = createSelector(
  getMasterData,
  fromMasterData.getAllEmploymentStatus
);

export const getEmployeeStatus = createSelector(
  getMasterData,
  fromMasterData.getAllEmployeeStatus
);

export const getContractTypes = createSelector(
  getMasterData,
  fromMasterData.getAllContractTypes
);

export const getSalaryTypes = createSelector(
  getMasterData,
  fromMasterData.getAllSalaryTypes
);
