import { SalaryType } from "@app/features/salary-type/models";

export interface SalaryTypeResponse {
  status: number;
  data: SalaryType[];
}
