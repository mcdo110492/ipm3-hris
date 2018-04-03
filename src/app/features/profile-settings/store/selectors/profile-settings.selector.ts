import { createSelector } from "@ngrx/store";

import * as fromFeature from "./../reducers";
import * as fromProfileSettings from "./../reducers/profile-settings.reducer";

export const getProfileSettings = createSelector(
  fromFeature.getProfileSettingsState,
  (state: fromFeature.ProfileSettingsState) => state.profileSettings
);

export const getProfileSettingsIsLoading = createSelector(
  getProfileSettings,
  fromProfileSettings.getIsLoading
);
