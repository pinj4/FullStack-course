"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientInfo = exports.newPatientInfoSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("./types");
const newPatientInfoSchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().date(),
    ssn: zod_1.z.string(),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    occupation: zod_1.z.string()
});
exports.newPatientInfoSchema = newPatientInfoSchema;
const toNewPatientInfo = (object) => {
    return newPatientInfoSchema.parse(object);
};
exports.toNewPatientInfo = toNewPatientInfo;
