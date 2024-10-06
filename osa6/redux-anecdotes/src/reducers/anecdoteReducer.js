import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      console.log('ACTION: ', action)
      console.log(JSON.parse(JSON.stringify(state)))
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      console.log('ACTION: ', action)
      const id = action.payload
      const anecdoteToChange = state.find (n => n.id === id)
      const updated = anecdoteToChange.votes + 1
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: updated
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer