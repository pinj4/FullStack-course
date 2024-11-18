import { useState, useEffect } from "react";
import { NonSensitiveDiaryEntry } from "./types";
import { getAll } from "./services/diaryService";
import DiaryEntry from "./components/DiaryEntry";

const App = () => {
  const [ diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAll().then(response => {
      setDiaries(response);
    });
  }, []);

  console.log(diaries);


  return (
    <div>
      <h2>Flight diaries</h2>
      <div>
        {diaries.map(d => 
          <div key={d.id}>
            <DiaryEntry diaryEntry = {d} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;