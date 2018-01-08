import { ContractType } from "@app/features/contract-type/models";

export interface ContractTypeResponse {
  status: number;
  data: ContractType[];
}
