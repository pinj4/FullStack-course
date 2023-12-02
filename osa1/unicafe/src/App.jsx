import { useState } from 'react'

const Header = ({text}) => (<h1>{text}</h1>)

const Display = ({text, value}) => <div> {text} {value}</div>

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = (props) => {
  console.log(props)
  
  const Average = (value, total) => {
    return value/total
  }

  const toPercentages = (value) => {
    return value*100+'%'
  }

  return (
    <>
      <Display text="good" value= {props.good} />
      <Display text="neutral" value= {props.neutral} />
      <Display text="bad" value= {props.bad} />

      <Display text="average" value={Average(props.total, props.count)} />
      <Display text="positive" value={toPercentages(Average(props.good, props.count))} />
    </>)
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
