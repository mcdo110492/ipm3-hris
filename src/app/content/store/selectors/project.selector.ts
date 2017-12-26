import { createSelector } from "@ngrx/store";

import * as fromFeature from "./../reducers";
import * as fromProject from "./../reducers/project.reducer";

export const getProject = createSelector(
  fromFeature.getContentState,
  (state: fromFeature.ContentState) => state.project
);

export const getProjectIsLoaded = createSelector(
  getProject,
  fromProject.isLoaded
);
export const getProjectsData = createSelector(getProject, fromProject.projects);

export const getSelectedProjectId = createSelector(
  getProject,
  fromProject.getSelectedProject
);
