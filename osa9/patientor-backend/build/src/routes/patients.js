"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPatientsWithoutSsn());
});
router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const addedPatient = patientService_1.default.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
    });
    res.json(addedPatient);
});
exports.default = router;
// "id": "d2773822-f723-11e9-8f0b-362b9e155667",
// "name": "Dana Scully",
// "dateOfBirth": "1974-01-05",
// "ssn": "050174-432N",
// "gender": "female",
// "occupation": "Forensic Pathologist"
