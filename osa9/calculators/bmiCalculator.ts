import { isNotNumber } from "./utils";

const calculateBmi = (h: number, w: number):string => {
  try {
    if (isNotNumber(h) || isNotNumber(w)) {
      throw new Error('input needs to be a number');
    }
  } catch (error: unknown) {
    let errorMessage = 'Error'
    if (error instanceof Error) {
      errorMessage += ': ' + error.message
    }
    return errorMessage
  }

  let bmi: number;
  bmi = w / ((h / 100)**2);
  if (bmi <= 18.4) {
    return 'Underweight';
  } else if (bmi > 18.4 && bmi <= 24.9) {
    return 'Normal range';
  } else if (bmi > 24.9 && bmi <= 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
}
if (require.main === module) {
  const h: number = Number(process.argv[2])
  const w: number = Number(process.argv[3])

  console.log(calculateBmi(h, w));
}


export default calculateBmi;
