import { z } from 'zod';
import { NewPatientInfo, Gender } from "./types";

const newPatientInfoSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
});

const toNewPatientInfo = (object: unknown): NewPatientInfo => {
  return newPatientInfoSchema.parse(object);
};


export {
  newPatientInfoSchema,
  toNewPatientInfo
};
