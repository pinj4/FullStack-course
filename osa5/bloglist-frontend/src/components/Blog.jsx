import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, currentUser, handleRemoveBlog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blogHidden, setBlogHidden] = useState(true)

  const hideBlog = () => {
    setBlogHidden(true)
  }

  const showBlog = () => {
    setBlogHidden(false)
  }

  const RemoveBlog = () => {
    if (blog.user.username === currentUser) {
      return (
        <button id="removeBlog-button" onClick={() => handleRemoveBlog(blog)}>delete</button>
      )
    }
  }

  const likeBlog = () => {
    console.log('blog ', blog)
    console.log('og likes: ', blog.likes, 'after like: ', blog.likes+1)
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1
    }
    handleLike(blog, blogObject)
  }

  if (!blogHidden) {
    console.log('show: ', blog.title, blog.author, blog.url, blog.likes, blog.user)
    return (
      <div style={blogStyle}>
        <div id="showBlog-content">
          <b>{blog.title} - {blog.author}</b>&ensp;<button id="hide-button" onClick={hideBlog}>hide</button> <br />
          {blog.url} <br />
            likes {blog.likes}&ensp;<button id="like-button" onClick={likeBlog}>like</button><br />
          {blog.user.username} <br />
          {RemoveBlog()}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={blogStyle}>
        {blog.title} - {blog.author}
        &ensp;<button id="showBlog-button" onClick={showBlog}>show</button>
      </div>
    </div>
  )
}

export default Blog