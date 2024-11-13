import { useQuery } from '@apollo/client'
import { useState } from "react"
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')
  const { loading, data, refetch } = useQuery(ALL_BOOKS, { variables: { genre: genre } })

  const filterResult = (genre) => {
    refetch({ genre: genre })
    setGenre(genre)
  }

  if (result.loading || loading || filterResult.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  console.log("data ", data)

  const books = result.data.allBooks
  const genres = [... new Set(books.map((b) => b.genres).flat(1))]

  const filteredBooks = data.allBooks

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
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button  onClick={() => filterResult('')}>all genres</button>
      <div>
      {genres.map((g)=> (
        <button key={g} onClick={() => filterResult(g)}>{g}</button>))}
      </div>
    </div>
  )
}

export default Books