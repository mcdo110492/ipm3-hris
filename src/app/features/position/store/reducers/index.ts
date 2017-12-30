import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromPosition from './position.reducer';

export interface PositionState {
    position: fromPosition.State
}

export const reducer : ActionReducerMap<PositionState> = {
    position: fromPosition.reducer
};

export const getPositionState = createFeatureSelector<PositionState>('position');
