"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPatientsWithoutSSN());
});
const newPatientParser = (req, _res, next) => {
    try {
        utils_1.newPatientInfoSchema.parse(req.body);
        console.log("parsed input: ", req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
router.post('/', newPatientParser, (req, res) => {
    const addedPatient = patientService_1.default.addPatient(req.body);
    res.json(addedPatient);
});
router.use(errorMiddleware);
exports.default = router;
