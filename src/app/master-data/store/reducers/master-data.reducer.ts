import * as MasterDataActions from "./../actions";
import { Project } from "@app/features/project/models";
import { Position } from "@app/features/position/models";
import { EmploymentStatus } from "@app/features/employment-status/models";
import { EmployeeStatus } from "@app/features/employee-status/models";
import { ContractType } from "@app/features/contract-type/models";

export interface State {
  projects: Project[];
  positions: Position[];
  employmentStatus: EmploymentStatus[];
  employeeStatus: EmployeeStatus[];
  contractTypes: ContractType[];
}

export const initialState: State = {
  projects: [],
  positions: [],
  employmentStatus: [],
  employeeStatus: [],
  contractTypes: []
};

export function reducer(
  state: State = initialState,
  action: MasterDataActions.Actions
): State {
  switch (action.type) {
    case MasterDataActions.LOAD_ALL_PROJECTS_SUCCESS: {
      return { ...state, projects: action.payload };
    }
    case MasterDataActions.LOAD_ALL_POSITIONS_SUCCESS: {
      return { ...state, positions: action.payload };
    }
    case MasterDataActions.LOAD_ALL_EMPLOYEESTATUS_SUCCESS: {
      return { ...state, employeeStatus: action.payload };
    }
    case MasterDataActions.LOAD_ALL_EMPLOYMENTSTATUS_SUCCESS: {
      return { ...state, employmentStatus: action.payload };
    }
    case MasterDataActions.LOAD_ALL_CONTRACTTYPE_SUCCESS: {
      return { ...state, contractTypes: action.payload };
    }
  }

  return state;
}

export const getAllProjects = (state: State) => state.projects;
export const getAllPositions = (state: State) => state.positions;
export const getAllEmployeeStatus = (state: State) => state.employeeStatus;
export const getAllEmploymentStatus = (state: State) => state.employmentStatus;
export const getAllContractTypes = (state: State) => state.contractTypes;
