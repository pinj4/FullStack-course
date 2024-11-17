import { CourseProps } from '../types';
import Part from './Part';

const Content = (props: CourseProps) => {
  console.log('parts ', props.courseParts);
  return (
    props.courseParts.map(c =>
      <div key={c.name}><Part part={c} /></div>
    )
  );
};

export default Content;