import axios from "axios";
import { useState } from "react";
import { DiaryEntryFormProps, Visibility, Weather } from "../types";
import diaryService from "../services/diaryService";
import Notification from "../components/Notification";

const DiaryEntryForm = (props: DiaryEntryFormProps) => {
  const addNewEntry = props.addNewEntry;
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');

  const handleNewEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const returnedEntry = await diaryService.addEntry({
        date: date,
        visibility: visibility as Visibility,
        weather: weather as Weather,
        comment: comment
      });
      console.log('created entry ', returnedEntry);
      addNewEntry(returnedEntry);
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
        setErrorMessage(error.response?.data);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
        reset();
      } else {
        console.error(error);
        reset();
      };
    };
  };

  const reset = () => {
    setDate('');
    setVisibility(Visibility.Great);
    setWeather(Weather.Sunny);
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification message={errorMessage} /> 
      <form>
        <p>
          date: <input type="date" value={date}
          onChange={(e) => setDate(e.target.value)}
          />
        </p>
        <p>
          visibility: 
          <input type="radio" name="visibility" value={visibility}
          onChange={() => setVisibility(Visibility.Great)} checked={visibility === Visibility.Great}
          /> Great
          <input type="radio" name="visibility" value={visibility}
          onChange={() => setVisibility(Visibility.Good)}
          /> Good
          <input type="radio" name="visibility" value={visibility}
          onChange={() => setVisibility(Visibility.Ok)}
          /> Ok
          <input type="radio" name="visibility" value={visibility}
          onChange={() => setVisibility(Visibility.Poor)}
          /> Poor
        </p>
        <p>
          weather: 
          <input type="radio" name="weather" value={weather}
          onChange={() => setWeather(Weather.Sunny)} checked={weather === Weather.Sunny}
          /> Sunny
          <input type="radio" name="weather" value={weather}
          onChange={() => setWeather(Weather.Cloudy)}
          /> Cloudy
          <input type="radio" name="weather" value={weather}
          onChange={() => setWeather(Weather.Rainy)}
          /> Rainy
          <input type="radio" name="weather" value={weather}
          onChange={() => setWeather(Weather.Windy)}
          /> Windy
          <input type="radio" name="weather" value={weather}
          onChange={() => setWeather(Weather.Stormy)}
          /> Stormy
        </p>
        <p>
          comment: <input value={comment}
          onChange={(e) => setComment(e.target.value)}
          />
        </p>
        <button onClick={reset}>reset</button>
        <button onClick={handleNewEntry}>add</button>
      </form>
    </div>
  );
};

export default DiaryEntryForm;