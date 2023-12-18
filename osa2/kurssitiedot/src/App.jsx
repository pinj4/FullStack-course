/*const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}      

const Part = (props) => {
  console.log(props)
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/>
    </div>
  )
}*/

import Course from "./components/Course"

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises 
                            + props.parts[1].exercises 
                            + props.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
