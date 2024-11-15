interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseInput = (args:string[]):number[] => {
  const argsArray: string[] = args.slice(2);

  const argsInt: number[] = [];
  argsArray.map((i) => argsInt.push(Number(i)));

  if (argsInt.map((i) => isNaN(i)).includes(true)) {
    throw new Error('input needs to be numbers');
  } else return argsInt;
};

const calculateExercises = (exercises: number[], target: number):Result => {
  const days: number = exercises.length;
  const trainingDays: number = exercises.filter(e => e !== 0).length;
  const trainingHours: number = exercises.reduce((sum, i) => sum + i, 0);
  const avg: number = trainingHours / days;
  const success: boolean = avg >= target;
  const trainingPercentage: number = avg / target;

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
    average: avg
  };
};

try {
  const [ target, ...exercises ] = parseInput(process.argv);
  console.log(calculateExercises(exercises, target));
} catch (error: unknown) {
  let errorMessage = 'Error';
  if (error instanceof Error) {
    errorMessage += ': ' + error.message;
  }
  console.log(errorMessage);
}