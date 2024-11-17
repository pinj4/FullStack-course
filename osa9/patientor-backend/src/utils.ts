import { NewPatientInfo, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (input: unknown, data: string): string => {
  if (!input || !isString(input)) {
    throw new Error('Incorrect or missing ' + data);
  }
  return input;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
  
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v =>
    v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const toNewPatientInfo = (object: unknown): NewPatientInfo => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object
    && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatientInfo = {
      name: parseString(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn, 'social security number'),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, 'occupation'),  
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export {
  toNewPatientInfo
};