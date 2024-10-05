import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'


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
  }).sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() =>
            dispatch(voteAnecdote(anecdote.id))
          }
        />
      )}
    </div>
  )
}

export default AnecdoteList