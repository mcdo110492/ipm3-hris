import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromContractType from './contract-type.reducer';

export interface ContractTypeState {
    contractType: fromContractType.State
}

export const reducer : ActionReducerMap<ContractTypeState> = {
    contractType: fromContractType.reducer
};

export const getContractTypeState = createFeatureSelector<ContractTypeState>('contractType');
