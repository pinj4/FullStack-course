import { useState } from 'react'
import blogService from '../services/blogs'


const NewBlog = ({user, setErrorMessage, setMessage, blogs, setBlogs, closeBlogForm}) => {
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
          likes: 0,
          user: user
      }
        closeBlogForm()
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

    return (
      <form onSubmit={addBlog}> 
      <h2>add a new blog</h2>
      <div>
        title: <input 
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
      </div>
      <div>
        author: <input 
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
      </div>
      <div>
        url: <input 
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
      </div>
      <div>
        <button type="submit">save</button>
      </div>
    </form>
    )
  }

  export default NewBlog