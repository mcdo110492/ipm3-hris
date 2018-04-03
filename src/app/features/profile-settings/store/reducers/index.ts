import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromProfileSettings from "./profile-settings.reducer";

export interface ProfileSettingsState {
  profileSettings: fromProfileSettings.State;
}

export const reducer: ActionReducerMap<ProfileSettingsState> = {
  profileSettings: fromProfileSettings.reducer
};

export const getProfileSettingsState = createFeatureSelector<
  ProfileSettingsState
>("profileSettings");
