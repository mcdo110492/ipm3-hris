import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromContent from "./content.reducer";
import * as fromSidenav from "./sidenav.reducer";
import * as fromProject from "./project.reducer";

export interface ContentState {
  content: fromContent.State;
  sidenav: fromSidenav.State;
  project: fromProject.State;
}

export const reducer: ActionReducerMap<ContentState> = {
  content: fromContent.reducer,
  sidenav: fromSidenav.reducer,
  project: fromProject.reducer
};

export const getContentState = createFeatureSelector<ContentState>("content");
