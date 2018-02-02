export interface EmployeeContact {
  employeeContactId: number;
  employeeId: number;
  presentAddress: string;
  provincialAddress: string;
  primaryMobileNumber: string;
  secondaryMobileNumber: string;
  telephoneNumber: string;
  created_at?: Date;
  updated_at?: Date;
}
