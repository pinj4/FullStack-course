const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await request.user

  if (!user) {
    response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = await request.user

  if (!user) {
    response.status(401).json({ error: 'token missing or invalid' })
  }

  if ( blog.user.toString() === user._id.toString() ) {
    await blog.deleteOne()
    response.status(204).end()
  }
  return response.status(400).json({ error: 'wrong user' })
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blogToBeUpdated = await Blog.findById(request.params.id)
  const user = await request.user

  if (!user) {
    response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  if (blogToBeUpdated.user.toString() === user._id.toString() ) {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  }
  return response.status(400).json({ error: 'wrong user' })
})

module.exports = blogsRouter