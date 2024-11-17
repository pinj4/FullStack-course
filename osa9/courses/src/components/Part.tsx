import { PartProps } from '../types';


const Part = (props: PartProps) => {
  const part = props.part;
  console.log('part: ', part);
  switch(part.kind) {
    case 'basic':
      return (
        <>
          <b>{part.name} {part.exerciseCount}</b>
          <p><i>{part.description}</i></p>
        </>
      );
    case 'group':
      return (
        <>
          <b>{part.name} {part.exerciseCount}</b>
          <p>project exercises {part.groupProjectCount}</p>
        </>
      );
    case 'background':
      return (
        <>
          <b>{part.name} {part.exerciseCount}</b>
          <p><i>{part.description}</i></p>
          <p>background material: {part.backgroundMaterial}</p>
        </>
      );
    case 'special':
      return (
        <>
          <b>{part.name} {part.exerciseCount}</b>
          <p><i>{part.description}</i></p>
          <p>requirements: {part.requirements.join(', ')}</p>
        </>
      );
    default:
        throw new Error('Course part\'s type is not "basic", "group", "background" or "special"');
  }
};

export default Part;