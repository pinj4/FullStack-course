import express from 'express';
import patientService from '../services/patientService';
import { PatientWithoutSsn } from '../types';

import { Response } from 'express';

const router = express.Router();

router.get('/', (_req, res: Response<PatientWithoutSsn[]>) => {
  res.send(patientService.getPatientsWithoutSsn());
});

router.post('/', (_req, res) => {
  res.send('saving a patient');
});
  

export default router;
