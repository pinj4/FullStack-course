import { z } from 'zod';
import { newPatientInfoSchema } from './utils';

export interface Diagnosis {
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

export type NonSensitivePatient = Omit<PatientInfo, 'ssn' | 'entries' >;

export type NewPatientInfo = z.infer<typeof newPatientInfoSchema>;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
};

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
};

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
};

export interface SickLeave {
  startDate: string;
  endDate: string;
};

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
};

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
};

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
