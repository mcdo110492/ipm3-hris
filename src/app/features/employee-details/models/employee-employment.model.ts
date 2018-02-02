export interface EmployeeEmployment {
  employeeEmploymentId: number;
  employeeId: number;
  positionId: number;
  employeeStatusId: number;
  employmentStatusId: number;
  dateHired: Date;
  remarks: string;
  created_at?: Date;
  updated_at?: Date;
}
