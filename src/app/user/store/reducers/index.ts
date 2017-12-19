import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromUser from './user.reducer';

export interface UserState {
    user: fromUser.State
}

export const reducer : ActionReducerMap<UserState> = {
    user: fromUser.reducer
};

export const getUserState = createFeatureSelector<UserState>('user');
