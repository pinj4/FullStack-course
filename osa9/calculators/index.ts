import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi:height?:weight?', (req, res) => {
  const { height, weight } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!target || !daily_exercises) {
    res.status(400).json({
      error: 'missing parameters'
    }); 
    return;
  } else if (typeof target !== 'number' ||
    !(daily_exercises instanceof Array) ||
    daily_exercises.map((i) => isNaN(Number(i))).includes(true)) {
    res.status(400).json({
      error: 'malformatted parameters'
    }); 
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, target);
  res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});