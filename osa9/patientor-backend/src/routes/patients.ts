import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService';
import { NewPatientInfo, NonSensitivePatient, PatientInfo } from '../types';
import { newPatientInfoSchema } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    newPatientInfoSchema.parse(req.body);
    console.log("parsed input: ", req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientInfo>, res: Response<PatientInfo>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.get('/:id', (req: Request, res:Response) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient === null) {
    res.status(400).send("can't find patient");
  };
  res.send(patient);
});

router.use(errorMiddleware);

export default router;