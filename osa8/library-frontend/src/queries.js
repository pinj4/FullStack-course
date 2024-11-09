import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount,
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title,
      author 
      {
      name
      id
      },
      published,
      genres,
      id
    }
  }
`

export const CREATE_BOOK = gql `
  mutation createBook($title: String!, $author: String!,  $published: Int!,
  $genres: [String]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      {
      name
      id
      }
      published
      genres
      id
    }
  }
`

export const EDIT_BIRTHYEAR = gql `
  mutation editBirthyear($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
      bookCount
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const FILTER_BOOKS = gql `
  query allBooks($genre: String!) {
   allBooks(genre: $genre) {
    title
    author {
      name
      id
    }
    published
    genres
    id
    }
  }
`

export const CURRENT_USER = gql`
  query {
    me {
      username,
      favoriteGenre
      id
    }
  }
`

export const BOOK_ADDED = gql `
  subscription {
    bookAdded {
      title
      author {
        name
        id
      }
      published
      genres
      id
    }
  }
`
