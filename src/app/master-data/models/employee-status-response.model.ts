import { EmployeeStatus } from "@app/features/employee-status/models";

export interface EmployeeStatusResponse {
  status: number;
  data: EmployeeStatus[];
}
