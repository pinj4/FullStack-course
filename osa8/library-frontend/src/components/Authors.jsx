import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)

  const [ editBirthyear ] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [ 
      { query: ALL_AUTHORS } 
    ]
  })

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    const bornInt = parseInt(born)
    editBirthyear({ variables: { name, setBornTo: bornInt } })

    console.log('editing..')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    <h2>set birthyear</h2>
      <form onSubmit={submit}>
      <div>
        name
        <select name="name" id="name" onChange={({ target }) => setName(target.value)}>
        <option value='' key=''></option>
         {authors.map((a) => (
          <option value={a.name} key={a.name}>{a.name}</option>
         ))}
        </select>
      </div>
      <div>
        born
        <input
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
      </div>
      <button type="submit">update</button>
      </form>
    </div>
  )
}

export default Authors