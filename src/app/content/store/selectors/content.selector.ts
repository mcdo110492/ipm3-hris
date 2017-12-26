import { createSelector } from "@ngrx/store";

import * as fromFeature from "./../reducers";
import * as fromContent from "./../reducers/content.reducer";

export const getContent = createSelector(
  fromFeature.getContentState,
  (state: fromFeature.ContentState) => state.content
);

export const getIsLoginPage = createSelector(
  getContent,
  fromContent.isLoginPage
);
export const getIsPageLoader = createSelector(
  getContent,
  fromContent.isPageLoader
);
