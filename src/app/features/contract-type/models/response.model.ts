import { ContractType } from "@app/features/contract-type/models/contract-type.model";

export interface DataResponse {
  status: number;
  count: number;
  data: ContractType[];
}

export interface CreateResponse {
  status: number;
  message: string;
}

export interface UpdateResponse {
  status: number;
  message: string;
  updatedData: ContractType;
}
