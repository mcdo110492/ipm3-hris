export interface EmployeeCompensation {
  employeeCompensationId: number;
  employeeId: number;
  salaryTypeId: number;
  salaryTypeCode?: string;
  salaryTypeName?: string;
  salary: string;
  effectiveDate: Date;
  remarks?: string;
  created_at?: Date;
  updated_at?: Date;
  compensationTableHash?: number;
}
