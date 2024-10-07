import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotifDispatch } from '../NotifContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotifDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      dispatch({
        type: 'NOTIFY',
        payload: 'too short anecdote, must have length 5 or more'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR'
        })
      }, 5000)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({
      type: 'NOTIFY',
      payload: `added "${content}"`
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
