import * as ProjectActions from "./../actions/project.action";
import { Project } from "@features/project/models/project.model";
export interface State {
  isLoaded: boolean;
  entities: { [id: number]: Project };
  selectedProjectId: number;
}

export const initialState: State = {
  isLoaded: false,
  entities: {},
  selectedProjectId: +localStorage.getItem("projectId") || 1
};

export function reducer(
  state = initialState,
  action: ProjectActions.ProjectContentActions
): State {
  switch (action.type) {
    case ProjectActions.LOAD_ALL_PROJECT_SUCCESS: {
      const projects = action.payload;
      const entities = projects.reduce(
        (entities: { [id: number]: Project }, data: Project) => {
          return {
            ...entities,
            [data.projectId]: data
          };
        },
        {
          ...state.entities
        }
      );
      return { ...state, isLoaded: true, entities };
    }

    case ProjectActions.LOAD_ALL_PROJECT_FAIL: {
      return { ...state, isLoaded: false };
    }

    case ProjectActions.SELECT_PROJECT: {
      return { ...state, selectedProjectId: action.payload };
    }

    case ProjectActions.ADD_PROJECT: {
      const project = action.payload;
      const entities = {
        ...state.entities,
        [project.projectId]: project
      };
      return { ...state, entities };
    }

    case ProjectActions.UPDATE_PROJECT: {
      const project = action.payload;
      const entities = {
        ...state.entities,
        [project.projectId]: project
      };

      return { ...state, entities };
    }
  }

  return state;
}

export const isLoaded = (state: State) => state.isLoaded;
export const projectEntities = (state: State) => state.entities;
export const getSelectedProject = (state: State) => state.selectedProjectId;
