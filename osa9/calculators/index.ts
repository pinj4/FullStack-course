import express from 'express';
import calculateBmi from './bmiCalculator';
import { isNotNumber } from "./utils";
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi:height?:weight?', (req, res) => {
  const { height, weight } = req.query;

  if (isNotNumber(Number(height)) || isNotNumber(Number(weight))) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
    return;
  }

  const bmi = calculateBmi(Number(height), Number(weight));
  res.json({
    weight,
    height,
    bmi
   });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});