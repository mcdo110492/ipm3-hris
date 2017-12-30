import { EmploymentStatus } from "./employment-status.model";

export interface DataResponse {
  status: number;
  count: number;
  data: EmploymentStatus[];
}

export interface StatusResponse {
  status: number;
  message: string;
  createdData?: EmploymentStatus;
}
