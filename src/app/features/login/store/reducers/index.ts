import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromLogin from './login.reducer';

export interface LoginState {
    login: fromLogin.State
}

export const reducer : ActionReducerMap<LoginState> = {
    login: fromLogin.reducer
};

export const getLoginState = createFeatureSelector<LoginState>('login');
