import { EmploymentStatus } from "./employment-status.model";

export interface DataResponse {
  status: number;
  count: number;
  data: EmploymentStatus[];
}

export interface CreateResponse {
  status: number;
  message: string;
}

export interface UpdateResponse {
  status: number;
  message: string;
  updatedData: EmploymentStatus;
}
