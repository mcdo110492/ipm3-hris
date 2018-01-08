import { EmployeeStatus } from "./employee-status.model";

export interface DataResponse {
  status: number;
  count: number;
  data: EmployeeStatus[];
}

export interface CreateResponse {
  status: number;
  message: string;
}

export interface UpdateResponse {
  status: number;
  message: string;
  updatedData: EmployeeStatus;
}
