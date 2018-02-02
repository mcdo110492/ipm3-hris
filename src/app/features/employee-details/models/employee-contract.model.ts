export interface EmployeeContract {
  employeeContractId: number;
  contractStart: Date;
  contractEnd: Date;
  contractTypeId: number;
  contractExtension?: Date;
  contractTableHash?: number;
  created_at?: Date;
  updated_at?: Date;
}
