var lodash = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((mostLikes, blog) => {
    return Math.max(blog.likes, mostLikes)
  }, -Infinity)

  const favorite = blogs.find((blog) => blog.likes === mostLikes)

  return JSON.stringify({
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  })
}

const mostBlogs = (blogs) => {
  const authors = lodash.uniq(blogs.map((blog) => blog.author))
  
  var authorsBlogs = authors.map((author) = function(author) { 
    return {"author": author, "blogs": 0} 
  })

  for (var i=0; i < blogs.length; i++) {
    var blog = authorsBlogs.find((blog) => blog.author === blogs[i].author)
    blog.blogs ++
  }
  
  return JSON.stringify(
    lodash.last(authorsBlogs.sort((a, b) => a.blogs - b.blogs))
  ) 
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}