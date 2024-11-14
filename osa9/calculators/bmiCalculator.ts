
const calculateBmi = (h: number, w: number):string => {
  let bmi: number;
  bmi = w / ((h / 100)**2);
  if (bmi <= 18.4) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal range';
  } else if (bmi >= 25 && bmi <= 29.9) {
    return 'Overweight';
  } else if (bmi >= 30.0) {
    return 'Obese';
  }
}

console.log(calculateBmi(180, 74));