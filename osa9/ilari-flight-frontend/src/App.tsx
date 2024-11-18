import { useState, useEffect } from "react";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";
import { getAll, addEntry } from "./services/diaryService";
import DiaryEntry from "./components/DiaryEntry";
import DiaryEntryForm from "./components/DiaryEntryForm";

const App = () => {
  const [ diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAll().then(response => {
      setDiaries(response);
    });
  }, []);

  console.log(diaries);

  const handleNewEntry = async (newEntry: NewDiaryEntry) => {
    const returnedEntry = await addEntry(newEntry);
    console.log('created entry ', returnedEntry);
    setDiaries(diaries.concat(returnedEntry));
  };


  return (
    <div>
      <h2>Add new entry</h2>
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