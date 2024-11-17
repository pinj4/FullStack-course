"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getPatientsWithoutSsn = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (newPatientInfo) => {
    // const id = uuid();
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, newPatientInfo);
    patients.push(newPatient);
    return newPatient;
};
exports.default = {
    getPatientsWithoutSsn,
    addPatient
};
// "id": "d2773822-f723-11e9-8f0b-362b9e155667",
// "name": "Dana Scully",
// "dateOfBirth": "1974-01-05",
// "ssn": "050174-432N",
// "gender": "female",
// "occupation": "Forensic Pathologist"
