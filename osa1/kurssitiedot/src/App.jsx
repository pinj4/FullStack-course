const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}
const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.names[0]} exercises={props.exercises[0]}/>
      <Part name={props.names[1]} exercises={props.exercises[1]}/>
      <Part name={props.names[2]} exercises={props.exercises[2]}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exercises.reduce((a,x) => a = a+x, 0)}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const names = ['Fundamentals of React', 'Using props to pass data','State of a component']
  const exercises = [10, 7, 14]

  return (
    <div>
      <Header course={course} />
      <Content names={names} exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  )
}

export default App