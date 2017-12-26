import { createSelector } from "@ngrx/store";

import * as fromFeature from "./../reducers";
import * as fromProject from "./../reducers/project.reducer";

export const getProject = createSelector(
  fromFeature.getProjectState,
  (state: fromFeature.ProjectState) => state.project
);

export const getProjectPageLength = createSelector(
  getProject,
  fromProject.getPageLength
);
export const getProjectPageSize = createSelector(
  getProject,
  fromProject.getPageSize
);
export const getProjectPageIndex = createSelector(
  getProject,
  fromProject.getPageIndex
);
export const getProjectSortField = createSelector(
  getProject,
  fromProject.getSortField
);
export const getProjectSortDirection = createSelector(
  getProject,
  fromProject.getSortDirection
);
export const getProjectSearchQuery = createSelector(
  getProject,
  fromProject.getSearchQuery
);
export const getProjectEntities = createSelector(
  getProject,
  fromProject.getEntities
);
export const getProjectData = createSelector(getProjectEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});
export const getProjectSelectedEntity = createSelector(
  getProject,
  fromProject.getSelectedEntity
);
export const getProjectSelectedEntityData = createSelector(
  getProjectEntities,
  getProjectSelectedEntity,
  (entities, selectedEntity) => {
    return entities[selectedEntity];
  }
);

export const getProjectIsLoading = createSelector(
  getProject,
  fromProject.getIsLoading
);
export const getProjectIsLoaded = createSelector(
  getProject,
  fromProject.getIsLoaded
);
