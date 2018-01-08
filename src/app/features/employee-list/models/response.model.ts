import { EmployeeList } from "@app/features/employee-list/models";

export interface DataResponse {
  status: number;
  count: number;
  data: EmployeeList[];
}
