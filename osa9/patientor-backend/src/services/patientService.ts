import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientInfo, PatientWithoutSsn, NewPatient } from '../types';

const patients: PatientInfo[] = patientsData;

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( newPatientInfo: NewPatient ): PatientInfo => {
  const newPatient: PatientInfo = {
    id: uuid(),
    ...newPatientInfo
  };

  patients.push(newPatient);
  return newPatient;
};


export default {
    getPatientsWithoutSsn,
    addPatient
};