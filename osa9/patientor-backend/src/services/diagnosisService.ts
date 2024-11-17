import diagnosisData from '../../data/diagnoses';

import { DiagnosisEntry } from '../types';

const diagnoses: DiagnosisEntry[] = diagnosisData;

const getDiagnoses = (): DiagnosisEntry[] => {
  return diagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis
};