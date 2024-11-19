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
  entries: Entry[]
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export type EntryType = null;

export type NonSensitivePatient = Omit<PatientInfo, 'ssn' | 'entries' >;

export type NewPatientInfo = z.infer<typeof newPatientInfoSchema>;