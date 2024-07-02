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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}