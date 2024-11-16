import patientsData from '../../data/patients';

import { PatientInfo, PatientWithoutSsn } from '../types';

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


export default {
    getPatientsWithoutSsn
};