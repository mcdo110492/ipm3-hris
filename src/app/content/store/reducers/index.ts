import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromContent from "./content.reducer";
import * as fromSidenav from "./sidenav.reducer";

export interface ContentState {
  content: fromContent.State;
  sidenav: fromSidenav.State;
}

export const reducer: ActionReducerMap<ContentState> = {
  content: fromContent.reducer,
  sidenav: fromSidenav.reducer
};

export const getContentState = createFeatureSelector<ContentState>("content");
