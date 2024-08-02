import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blogHidden, setBlogHidden] = useState(true)
  const [blogLikes, setBlogLikes] = useState(blog.likes)

  const hideBlog = () => {
    setBlogHidden(true)
  }

  const showBlog = () => {
    setBlogHidden(false)
  }

  const likeBlog =  () => {
    console.log("blog ", blog)
    console.log("og likes: ", blog.likes, "after like: ", blog.likes+1)
    const updatedLikes = blog.likes+1
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: updatedLikes
    }
    blogService.like(blog.id, blogObject)
    setBlogLikes(updatedLikes)
  }

  if (!blogHidden) {
    console.log("show: ", blog.title, blog.author, blog.url, blogLikes, blog.user)
    return (
      <div style={blogStyle}>
        <div>
          <b>{blog.title} - {blog.author}</b>&ensp;<button onClick={hideBlog}>hide</button> <br />
          {blog.url} <br />
          likes {blogLikes}&ensp;<button onClick={likeBlog}>like</button><br />
          {blog.user.username} <br />
        </div>
      </div>
    )
  } 

  return (
    <div>
      <div style={blogStyle}>
        {blog.title} - {blog.author}
        &ensp;<button onClick={showBlog}>show</button>
      </div>
    </div>  
  )
}

export default Blog