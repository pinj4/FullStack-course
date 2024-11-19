import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientInfo, NonSensitivePatient, NewPatientInfo } from '../types';

const patients: PatientInfo[] = patientsData;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( newPatientInfo: NewPatientInfo ): PatientInfo => {
  const newPatient: PatientInfo = {
    id: uuid(),
    ...newPatientInfo
  };

  patients.push(newPatient);
  return newPatient;
};

const getPatient = (id:string): PatientInfo | null => {
  const returnedPatient = patients.find(p => p.id === id);
  return returnedPatient ? returnedPatient : null;
};


export default {
  getNonSensitivePatients,
  addPatient,
  getPatient
};