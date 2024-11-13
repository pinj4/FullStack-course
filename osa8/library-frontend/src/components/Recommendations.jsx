import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_BOOKS, CURRENT_USER } from '../queries'

const Recommendations = ({ show }) => {
  const [genre, setGenre] = useState('')

  const currentUser = useQuery(
    CURRENT_USER, 
    { fetchPolicy:'cache-and-network' }
  )

  useEffect(() => {
    if ( currentUser.data ) {
      const genre2 =  currentUser.data.me.favoriteGenre
      setGenre(genre2)
    }
  }, [currentUser.data])

  const filterResult = useQuery(ALL_BOOKS, {
    variables: {genre: genre},
    skip: !genre
  })

  if (!show ) {
    return null
  }

  if (filterResult.loading || currentUser.loading)  {
    return <div>loading...</div>
  }

  const filteredBooks = filterResult.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{genre}</b>

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
    </div>
  )
}

export default Recommendations