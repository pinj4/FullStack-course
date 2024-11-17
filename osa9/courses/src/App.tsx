import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import coursePartsData from '../data/courseparts';


const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts = coursePartsData;
  console.log(courseParts);

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
