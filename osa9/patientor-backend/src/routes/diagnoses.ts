import express from 'express';
import diagnosisService from '../services/diagnosisService';
import { DiagnosisEntry } from '../types';

import { Response } from 'express';

const router = express.Router();

router.get('/', (_req, res: Response<DiagnosisEntry[]>) => {
  res.send(diagnosisService.getDiagnoses());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

export default router;