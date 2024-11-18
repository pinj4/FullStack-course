import { DiaryEntryProps } from "../types";

const DiaryEntry = (props: DiaryEntryProps) => {
  const diaryEntry = props.diaryEntry;
  return (
    <div key={diaryEntry.id}>
      <h4>{diaryEntry.date}</h4>
      <p>weather: {diaryEntry.weather}</p>
      <p>visibility: {diaryEntry.visibility}</p>
    </div>
  );
};

export default DiaryEntry;