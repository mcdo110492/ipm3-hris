import { EmployeeStatus } from "./employee-status.model";

export interface DataResponse {
  status: number;
  count: number;
  data: EmployeeStatus[];
}

export interface StatusResponse {
  status: number;
  message: string;
  createdData?: EmployeeStatus;
}
