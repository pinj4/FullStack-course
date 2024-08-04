import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlog from './components/newBlog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(false)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
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
      setMessage('wrong credentials')
      setErrorMessage(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

    console.log('logging in with', username, password)
  }


  const loginForm = () => {
    return (
      <div>
        <div>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </div>
      </div>
    )
  }

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user= {user}
          handleRemoveBlog={handleRemoveBlog} />
      )}
    </div>
  )

  const handleRemoveBlog = (blog) => {
    console.log('blog to be deleted ', blog)
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id)
      console.log('blogs ', blogs)
      const updatedBlogs = blogs.filter((updatedBlog) => updatedBlog.id !== blog.id)
      setBlogs(updatedBlogs)
      setMessage(
        `Deleted ${blog.title} by ${blog.author}`
      )
      setErrorMessage(false)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

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

  const closeBlogForm = () => {
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} message={message}/>
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        {logoutForm()}
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <NewBlog
            user={user}
            setErrorMessage={setErrorMessage}
            setMessage={setMessage}
            blogs={blogs}
            setBlogs={setBlogs}
            closeBlogForm={closeBlogForm}
          />
        </Togglable>
        {blogList()}

      </div>
      }

    </div>
  )
}

export default App