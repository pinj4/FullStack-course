import axios from "axios";
import { useState, useEffect } from "react";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";
import { getAll, addEntry } from "./services/diaryService";
import DiaryEntry from "./components/DiaryEntry";
import DiaryEntryForm from "./components/DiaryEntryForm";
import Notification from "./components/Notification";

const App = () => {
  const [ diaries, setDiaries ] = useState<NonSensitiveDiaryEntry[]>([]);
  const [ errorMessage, setErrorMessage ] = useState('');

  useEffect(() => {
    getAll().then(response => {
      setDiaries(response);
    });
  }, []);

  console.log(diaries);

  const handleNewEntry = async (newEntry: NewDiaryEntry) => {
    try {
      const returnedEntry = await addEntry(newEntry);
      console.log('created entry ', returnedEntry);
      setDiaries(diaries.concat(returnedEntry));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
        setErrorMessage(error.response?.data);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      } else {
        console.error(error);
      };
    };
  };


  return (
    <div>
      <h2>Add new entry</h2>
      <Notification message={errorMessage} /> 
      <div>
        <DiaryEntryForm handleNewEntry={handleNewEntry} />
      </div>
      <h2>Flight diaries</h2>
      <div>
        {diaries.map(d => 
          <div key={d.id}>
            <DiaryEntry diaryEntry={d} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;