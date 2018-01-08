import { EmploymentStatus } from "@app/features/employment-status/models";

export interface EmploymentStatusResponse {
  status: number;
  data: EmploymentStatus[];
}
