import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../queries'

const Authors = ({ show, token }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)

  const [ editBirthyear ] = useMutation(EDIT_BIRTHYEAR)

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }

  const authors = result.data.allAuthors
  console.log('authors ', authors)

  const submit = async (event) => {
    event.preventDefault()
    const bornInt = parseInt(born)
    editBirthyear({ variables: { name: name, setBornTo: bornInt } })

    console.log('editing..')
    setBorn('')
  }

  if (!token) {
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
      </div>
    )
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