import { EmployeePersonalEffects } from "./employee-personal.effect";
import { EmployeeEmploymentEffects } from "./employee-employment.effect";
import { EmployeeContactEffects } from "./employee-contact.effect";
import { EmployeeGovernmentEffects } from "./employee-government.effect";

export const effects: any[] = [
  EmployeePersonalEffects,
  EmployeeEmploymentEffects,
  EmployeeContactEffects,
  EmployeeGovernmentEffects
];

export * from "./employee-personal.effect";
export * from "./employee-employment.effect";
export * from "./employee-contact.effect";
export * from "./employee-government.effect";
