import { CourseProps } from '../types';

const Content = (props: CourseProps)=> {
  return (
   props.courseParts.map(c =>
    <p key={c.name}>{c.name} {c.exerciseCount}</p>
  ));
};

export default Content;