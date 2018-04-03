import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromUserManagement from "./user-management.reducer";

export interface UserManagementState {
  userManagement: fromUserManagement.State;
}

export const reducer: ActionReducerMap<UserManagementState> = {
  userManagement: fromUserManagement.reducer
};

export const getUserManagementState = createFeatureSelector<
  UserManagementState
>("userManagement");
