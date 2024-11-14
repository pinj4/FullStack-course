interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exercises: number[], target: number):Result => {
  let days: number = exercises.length;
  let trainingDays: number = exercises.filter(e => e !== 0).length;
  let trainingHours: number = exercises.reduce((sum, i) => sum + i, 0);
  let avg: number = trainingHours / days;
  let success: boolean = avg >= target;
  let trainingPercentage: number = avg / target;
  
  let rating: number;
  let desc: string;
  if (trainingPercentage >= 1) {
    rating = 3;
    desc = 'great job! :D';
  } else if (trainingPercentage <= 0.5) {
    rating = 1;
    desc = 'you can do better';
  } else {
    rating = 2;
    desc = 'not too bad but could be better';
  }
  
  return {
    periodLength: days,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: desc,
    target: target,
    average: avg,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));