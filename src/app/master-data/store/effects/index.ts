import { MasterProjectEffects } from "./master-project.effect";
import { MasterPositionEffects } from "./master-position.effect";
import { MasterEmploymentStatusEffects } from "./master-employment-status.effect";
import { MasterEmployeeStatusEffects } from "./master-employee-status.effect";
import { MasterContractTypeEffects } from "./master-contract-type.effect";

export const effects: any[] = [
  MasterProjectEffects,
  MasterPositionEffects,
  MasterEmploymentStatusEffects,
  MasterEmployeeStatusEffects,
  MasterContractTypeEffects
];

export * from "./master-project.effect";
export * from "./master-position.effect";
export * from "./master-employment-status.effect";
export * from "./master-employee-status.effect";
export * from "./master-contract-type.effect";
