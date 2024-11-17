import express from 'express';
import { Response } from 'express';
import patientService from '../services/patientService';
import { PatientWithoutSsn } from '../types';
import { toNewPatientInfo } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<PatientWithoutSsn[]>) => {
  res.send(patientService.getPatientsWithoutSsn());
});

router.post('/', (req, res) => {
  try {
    const newPatientInfo = toNewPatientInfo(req.body);

    const addedPatient = patientService.addPatient(newPatientInfo);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
