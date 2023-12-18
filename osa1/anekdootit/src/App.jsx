import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <p>
    <button onClick={handleClick}>
      {text}
    </button>
    </p>
  )
}  

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

   
  const [selected, setSelected] = useState(0)
  const [selected_points, setPoints] = useState(new Array(8).fill(0))

  const getAnecdote = () => () => setSelected(Math.floor(Math.random()*anecdotes.length))

  const Vote = () => () => {
    console.log("points before ", selected_points)
    const copy = [...selected_points]
    copy[selected] += 1
    setPoints(copy)
    console.log("points after ", selected_points)
  }


  return (
    <div>
      {anecdotes[selected]}
      <p>
        has {selected_points[selected]} votes
      </p>
      <Button handleClick={Vote()} text='vote' />
      <Button handleClick={getAnecdote()} text='next anecdote' />
    </div>
  )
}

export default App