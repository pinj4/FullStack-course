import { useState } from 'react'
import blogService from '../services/blogs'


const NewBlog = ({user, setErrorMessage, setMessage, blogs, setBlogs}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
      event.preventDefault()
      try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
        user: user
     }
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(
        `a new blog "${title}" by ${author} added!`
      )
      setErrorMessage(false)
      setTimeout(() => {
          setMessage(null)
        }, 5000)
    } catch(error) {
      setMessage(
        'an error occured while creating a new blog'
        )
      setErrorMessage(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      }
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

    return (
      <form onSubmit={addBlog}> 
      <h2>add a new blog</h2>
      <div>
        title: <input 
                value={title}
                onChange={handleTitleChange}
              />
      </div>
      <div>
        author: <input 
                value={author}
                onChange={handleAuthorChange}
              />
      </div>
      <div>
        url: <input 
                value={url}
                onChange={handleUrlChange}
              />
      </div>
      <div>
        <button type="submit">save</button>
      </div>
    </form>
    )
  }

  export default NewBlog