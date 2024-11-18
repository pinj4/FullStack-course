import axios from "axios";
import { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(
    `${apiBaseUrl}/diaries`
  );

  return data;
};

const addEntry = async(object: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(
    `${apiBaseUrl}/diaries`, object
  );
  
  return data;
};

export {
  getAll,
  addEntry
};