export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
};

export interface PatientInfo {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
};

export type PatientWithoutSsn = Omit<PatientInfo, "ssn">;

export type NewPatientInfo = Omit<PatientInfo, 'id'>;

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
};