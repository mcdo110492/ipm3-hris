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
export const getProjectsEntities = createSelector(
  getProject,
  fromProject.projectEntities
);
export const getProjectsData = createSelector(getProjectsEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getSelectedProjectId = createSelector(
  getProject,
  fromProject.getSelectedProject
);
