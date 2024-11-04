const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author:String, genre:String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ):Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ):Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`
const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author', { name: 1 })
      }
      else if (args.author && args.genre) {
        const authorFound = await Author.findOne({ name: args.author })
        const authorsBooks = Book.find({ author: authorFound }).populate('author', { name: 1 })
        return authorsBooks.find({ genres: args.genre })
      }
      else if (args.genre) {
        return Book.find({ genres: args.genre }).populate('author', { name: 1 })
  
      }
      const authorFound = await Author.findOne({ name: args.author })
      return Book.find({ author: authorFound })
    },
    allAuthors: async (root, args) => Author.find({}),
    me: async (root, args, context) => context.currentUser
  },

  Author: {
    bookCount: async (root) => {
      const authorsBooks = await Book.find({ author: root })
      console.log('book count ', authorsBooks)
      return authorsBooks.length
    }
  },


  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const found = await Author.findOne({ name: args.author })
      if (!found) {
        console.log("CANT FIND")
        const bookAuthor = new Author({ name: args.author})
        if (args.title.length > 5) {
          try {
            await bookAuthor.save()
          } catch (error) {
            throw new GraphQLError(
              'Saving author failed: name needs to be at least 4 characters', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.title,
                  error
                }
              })
            }
          console.log('new author added ', bookAuthor)
        }
        const book = new Book({ ...args, author: bookAuthor})
        try {
          await book.save()
        } catch (error) {
          throw new GraphQLError(
            'Saving book failed: title needs to be at least 5 characters', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }
        console.log('new book added ', book)
        return book
      } else {
        const book = new Book({ ...args, author: found})
        try {
          await book.save()
        } catch (error) {
          throw new GraphQLError(
            'Saving book failed: title needs to be at least 5 characters', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        console.log('new book added ', book)
        return book
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const author = await Author.findOne ({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      console.log('updated ', author)
      return author.save()
    },
    createUser: async(root, args) => {
      const user = new User({ 
        username: args.username, 
        favoriteGenre: args.favoriteGenre 
      })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async(root, args) => {
      const user = await User.findOne({ username: args.username })
      const passwordString = args.password.valueOf()

      if ( !user || passwordString !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: args.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) } 
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})