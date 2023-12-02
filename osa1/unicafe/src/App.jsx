import { useState } from 'react'

const Header = ({text}) => (<h1>{text}</h1>)

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )
}

const Statistics = (props) => {
  console.log(props)
  
  const Average = (value, total) => value/total

  const Round = (value) => Number.parseFloat(value).toFixed(1)

  if (props.count === 0) {
    return (
      <>
        No feedback given
      </>
    )
  }

  return (
    <table>
      <tbody>
      <StatisticsLine text="good" value= {props.good} />
      <StatisticsLine text="neutral" value= {props.neutral} />
      <StatisticsLine text="bad" value= {props.bad} />
      <StatisticsLine text="all" value= {props.count} />
      <StatisticsLine text="average" value={Round(Average(props.total, props.count))} />
      <StatisticsLine text="positive" value={Round((Average(props.good, props.count))*100)+'%'} />
      </tbody>
    </table>)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [count, setCount] = useState(0)
  const [total, setTotal] = useState(0)

  const rateGood = () => {
    console.log("good ", good)
    setGood(good + 1)
    setCount(count + 1)
    setTotal(total + 1)
  }

  const rateNeutral= () => {
    setNeutral(neutral + 1)
    setCount(count + 1)
  }

  const rateBad= () => {
    setBad(bad + 1) 
    setCount(count + 1)
    setTotal(total - 1)
  }

  return (
    <div>
      <Header text = "give feedback" />
      <Button handleClick={rateGood} text='good' />
      <Button handleClick={rateNeutral} text='neutral' />
      <Button handleClick={rateBad} text='bad' />

      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} 
                  bad={bad} total={total} count={count} />
    </div>
  )
}

export default App
