import { SalaryType } from "@app/features/salary-type/models/salary-type.model";

export interface DataResponse {
  status: number;
  count: number;
  data: SalaryType[];
}

export interface CreateResponse {
  status: number;
  message: string;
}

export interface UpdateResponse {
  status: number;
  message: number;
  updatedData: SalaryType;
}
