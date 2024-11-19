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
      <h1>{patient?.name}</h1>
      gender: {patient?.gender}<br />
      ssh: {patient?.ssn}<br />
      occupation: {patient?.occupation}<br />
      <h2>entries</h2>
        {patient?.entries.map((entry) => (
          <p key={entry.id}>
            <b>{entry.date}</b><br />
            <i>{entry.description}</i><br />
            {entry.diagnosisCodes?.map((d =>
              <li key={d}>{d}</li>
            ))}
          </p>
        ))}
    </div>
  );
};

export default PatientPage;
