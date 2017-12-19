import { createSelector } from "@ngrx/store";

import * as fromFeature from "./../reducers";
import * as fromSidenav from "./../reducers/sidenav.reducer";

export const getSidenav = createSelector(
  fromFeature.getContentState,
  (state: fromFeature.ContentState) => state.sidenav
);

export const getIsSidenavOpen = createSelector(
  getSidenav,
  fromSidenav.isSidenavOpen
);
export const getIsSidenavMode = createSelector(
  getSidenav,
  fromSidenav.isSidenavMode
);
export const getSidenavLinks = createSelector(
  getSidenav,
  fromSidenav.sidenavLinks
);
