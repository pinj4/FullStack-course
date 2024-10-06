import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      {anecdote.content}
      <div>
          has {anecdote.votes}
          <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}


const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    console.log('current state.filter: ', state.filter)
    if ( state.filter !== '' ) {
      return state.anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase()
        .includes(state.filter.toLowerCase()))
    }
    return state.anecdotes
  })
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  console.log('anecdotes ', anecdotes)

  const handleClick = anecdote => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`you voted for "${anecdote.content}"`, 5))
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleClick(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList