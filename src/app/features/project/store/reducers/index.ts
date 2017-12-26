import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromProject from './project.reducer';

export interface ProjectState {
    project: fromProject.State
}

export const reducer : ActionReducerMap<ProjectState> = {
    project: fromProject.reducer
};

export const getProjectState = createFeatureSelector<ProjectState>('project');
