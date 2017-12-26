import * as ProjectActions from "./../actions/project.action";
import { Project } from "@features/project/models/project.model";
export interface State {
  isLoaded: boolean;
  projects: Project[];
  selectedProjectId: number;
}

export const initialState: State = {
  isLoaded: false,
  projects: [],
  selectedProjectId: +localStorage.getItem("projectId") || 1
};

export function reducer(
  state = initialState,
  action: ProjectActions.ProjectContentActions
): State {
  switch (action.type) {
    case ProjectActions.LOAD_ALL_PROJECT_SUCCESS: {
      const projects = action.payload;
      return { ...state, isLoaded: true, projects };
    }

    case ProjectActions.LOAD_ALL_PROJECT_FAIL: {
      return { ...state, isLoaded: false };
    }

    case ProjectActions.SELECT_PROJECT: {
      return { ...state, selectedProjectId: action.payload };
    }
  }

  return state;
}

export const isLoaded = (state: State) => state.isLoaded;
export const projects = (state: State) => state.projects;
export const getSelectedProject = (state: State) => state.selectedProjectId;
