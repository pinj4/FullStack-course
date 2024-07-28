import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const BlogForm = (props) => {
  return (
    <form onSubmit={props.addBlog}> 
    <h2>add a new blog</h2>
    <div>
      title: <input 
              value={props.title}
              onChange={props.handleTitleChange}
            />
    </div>
    <div>
      author: <input 
              value={props.author}
              onChange={props.handleAuthorChange}
            />
    </div>
    <div>
      url: <input 
              value={props.url}
              onChange={props.handleUrlChange}
            />
    </div>
    <div>
      likes: <input 
              value={props.likes}
              onChange={props.handleLikesChange}
            />
    </div>
    <div>
      <button type="submit">save</button>
    </div>
  </form>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    console.log('logging in with', username, password)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
    <div>
      <h2>log in to application</h2>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
  )

  const handleLogout = () => {
    window.localStorage.clear()
  }
  
  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <div>
        <button type="submit">log out</button>
      </div>
    </form>
  )

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: likes,
      user: user
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setTitle('')
          setAuthor('')
          setUrl('')
          setAuthor('')
          setLikes('')
        })
  }

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setUrl(event.target.value)
  }

  const handleLikesChange = (event) => {
    console.log(event.target.value)
    setLikes(event.target.value)
  }

  return (
    <div>
    <Notification message={errorMessage} />
    {!user && loginForm()}
    {user && <div>
       <p>{user.name} logged in</p>
         {logoutForm()}
         <BlogForm
          title={title}
          author={author} 
          url={url}
          likes={likes}
          handleTitleChange={handleTitleChange}
          handleAuthorChange={handleAuthorChange}
          handleUrlChange={handleUrlChange}
          handleLikesChange={handleLikesChange}
          addBlog={addBlog}
          />
         {blogList()}

      </div>
    } 

    </div>
  )
}

export default App