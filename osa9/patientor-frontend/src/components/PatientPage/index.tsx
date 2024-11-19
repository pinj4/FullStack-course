import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };
    void fetchPatient();
  });

  return (
    <div>
      <h3>{patient?.name}</h3>
      <p>gender: {patient?.gender}</p>
      <p>ssh: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
    </div>
  );
};

export default PatientPage;
