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
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
      <Display text="all" value={count} />
      <Display text="average" value={(total/count)}/>
      <Display text="positive" value={good/count*100 + '%'}/>
    </div>
  )
}

export default App
