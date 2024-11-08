import { useQuery } from '@apollo/client'
import { useState } from "react";
import { ALL_BOOKS, FILTER_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')
  const filterResult = useQuery(FILTER_BOOKS, {variables: {genre}, fetchPolicy: 'no-cache'})


  if (result.loading || filterResult.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = result.data.allBooks
  const genres = [... new Set(books.map((b) => b.genres).flat(1))]

  return (
    <div>
      <h2>books</h2>

      in genre <b>{genre}</b>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterResult.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button  onClick={() => setGenre('')}>all genres</button>
      <div>
      {genres.map((g)=> (
        <button key={g} onClick={() => setGenre(g)}>{g}</button>))}
      </div>
    </div>
  )
}

export default Books
