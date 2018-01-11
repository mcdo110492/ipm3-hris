export interface EmployeeEmployment {
  employeeEmploymentId: number;
  employeeId: number;
  positionId: number;
  employeeStatusId: number;
  employmentStatusId: number;
  dateHired: Date;
  contractStart: Date;
  contractEnd: Date;
  contractTypeId: number;
  remarks: string;
  created_at?: Date;
  updated_at?: Date;
}
