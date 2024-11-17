import { z } from 'zod';
import { newPatientInfoSchema } from './utils';

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
};

export interface PatientInfo {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

export type PatientWithoutSSN = Omit<PatientInfo, "ssn">;

export type NewPatientInfo = z.infer<typeof newPatientInfoSchema>;
