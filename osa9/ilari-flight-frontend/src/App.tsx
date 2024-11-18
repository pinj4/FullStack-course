import { useState, useEffect } from "react";
import { NonSensitiveDiaryEntry, DiaryEntryType} from "./types";
import diaryService from "./services/diaryService";
import DiaryEntry from "./components/DiaryEntry";
import DiaryEntryForm from "./components/DiaryEntryForm";

const App = () => {
  const [ diaries, setDiaries ] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then(response => {
      setDiaries(response);
    });
  }, []);

  console.log(diaries);

  const addNewEntry = (newEntry: DiaryEntryType) => {
    setDiaries(diaries.concat(newEntry));
  };

  return (
    <div>
      <div>
        <DiaryEntryForm addNewEntry={addNewEntry} /> 
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