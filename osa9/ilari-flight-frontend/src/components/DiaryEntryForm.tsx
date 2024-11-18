import { useState } from "react";
import { DiaryEntryFormProps, Visibility, Weather } from "../types";

const DiaryEntryForm = (props: DiaryEntryFormProps) => {
  const handleNewEntry = props.handleNewEntry;
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleNewEntry({
      date: date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment: comment
    });

    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return(
    <div>
      <form onSubmit={addEntry}>
        <p>
          date: <input value={date}
          onChange={(e) => setDate(e.target.value)}
          />
        </p>
        <p>
          visibility: <input value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          />
        </p>
        <p>
          weather: <input value={weather}
          onChange={(e) => setWeather(e.target.value)}
          />
        </p>
        <p>
          comment: <input value={comment}
          onChange={(e) => setComment(e.target.value)}
          />
        </p>
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default DiaryEntryForm;