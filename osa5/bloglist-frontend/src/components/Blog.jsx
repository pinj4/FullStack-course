import { useState } from 'react'

const Blog = ({ blog, user }) => {
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

  if (!blogHidden) {
    return (
      <div style={blogStyle}>
        <div>
          <b>{blog.title} - {blog.author}</b>&ensp;<button onClick={hideBlog}>hide</button> <br />
          {blog.url} <br />
          likes {blog.likes}&ensp;<button>like</button><br />
          {user.username} <br />
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