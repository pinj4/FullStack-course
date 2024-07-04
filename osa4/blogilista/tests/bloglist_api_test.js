const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are six blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 6)
})

test('blog identifier is named as id', async() => {
  const response = await api.get('/api/blogs')
  const first = response.body[0]

  assert.strictEqual(Object.hasOwn(first, 'id'), true)
})

test('a valid blog can be added', async() => {
  const newBlog = {
    title: 'testblog',
    author: 'Test Guy',
    url: 'testblog.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  assert(titles.includes('testblog'))

})

test('blog with no likes can be added and shows 0 likes', async() => {
    const newBlog = {
      title: 'testblog2',
      author: 'Test Guy2',
      url: 'testblog2.com',
      likes: ''
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

    const last = response.body.pop()
    assert.strictEqual(last.title, 'testblog2')
    assert.strictEqual(last.likes, 0)
  
  })

after(async () => {
  await mongoose.connection.close()
})