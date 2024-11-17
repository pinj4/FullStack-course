import { CourseProps } from '../types';

const Total = (props: CourseProps) => {
  const total = props.courseParts.reduce(
    (sum, current) => sum + current.exerciseCount, 0);

  return <p>Number of exercises {total}</p>;
};

export default Total;