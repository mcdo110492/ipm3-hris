import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromMasterData from "./master-data.reducer";

export interface MasterDataState {
  masterData: fromMasterData.State;
}

export const reducer: ActionReducerMap<MasterDataState> = {
  masterData: fromMasterData.reducer
};

export const getMasterDataState = createFeatureSelector<MasterDataState>(
  "masterData"
);
