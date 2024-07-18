const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('tester', 10)
  const user = new User({ username: 'tester', name: 'tester', passwordHash })

  await user.save()
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
  const user = {
    username: 'tester',
    password: 'tester'
  }
  const res = await api
    .post('/api/login')
    .send(user)
    .expect(200)

  const newBlog = {
    title: 'testblog',
    author: 'Test Guy',
    url: 'testblog.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${res.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  assert(titles.includes('testblog'))

})

test('a blog cant be added without being logged in', async() => {

  const newBlog = {
    title: 'testblog',
    author: 'Test Guy',
    url: 'testblog.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
  assert(!titles.includes('testblog'))

})

test('blog with no likes can be added and shows 0 likes', async() => {
  const user = {
    username: 'tester',
    password: 'tester'
  }
  const res = await api
    .post('/api/login')
    .send(user)
    .expect(200)

  const newBlog = {
    title: 'testblog2',
    author: 'Test Guy2',
    url: 'testblog2.com',
    likes: ''
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${res.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  const last = response.body.pop()
  assert.strictEqual(last.title, 'testblog2')
  assert.strictEqual(last.likes, 0)

})

test('blog can be deleted by the correct user', async() => {
  const user = {
    username: 'tester',
    password: 'tester'
  }

  const res = await api
    .post('/api/login')
    .send(user)
    .expect(200)

  const toBeDeleted = {
    title: 'deletethis',
    author: 'temp',
    url: 'deletedblog.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${res.body.token}`)
    .send(toBeDeleted)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()

  const blogToDelete = blogs.pop()
  assert.strictEqual('deletethis', blogToDelete.title)

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${res.body.token}`)
    .expect(204)

  const blogs_after = await helper.blogsInDb()
  assert.strictEqual(blogs_after.length, helper.initialBlogs.length)

  const titles = blogs_after.map(r => r.title)
  assert(!titles.includes(blogToDelete.title))
})

test('blog cant be deleted with unauthorized user', async() => {
  const user = {
    username: 'tester',
    password: 'tester'
  }

  const res = await api
    .post('/api/login')
    .send(user)
    .expect(200)

  const toBeDeleted = {
    title: 'deletethis',
    author: 'temp',
    url: 'deletedblog.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${res.body.token}`)
    .send(toBeDeleted)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const passwordHash = await bcrypt.hash('tester2', 10)
  const user2 = new User({ username: 'tester2', name: 'tester2', passwordHash })

  await user2.save()

  const user2LogIn = {
    username: 'tester2',
    password: 'tester2'
  }

  const res2 = await api
    .post('/api/login')
    .send(user2LogIn)
    .expect(200)

  const blogs = await helper.blogsInDb()

  const blogToDelete = blogs.pop()
  assert.strictEqual('deletethis', blogToDelete.title)

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${res2.body.token}`)
    .expect(400)

  const blogs_after = await helper.blogsInDb()
  assert.strictEqual(blogs_after.length, helper.initialBlogs.length+1)

  const titles = blogs_after.map(r => r.title)
  assert(titles.includes(blogToDelete.title))
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'user',
      name: 'actual name',
      password: 'topsecret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username < 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'no',
      name: 'user',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('username needs to be at least 3 characters long'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password < 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'username',
      name: 'user',
      password: 'no',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('password needs to be at least 3 characters long'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message without a username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '',
      name: 'user',
      password: 'topsecret',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('username missing'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message without a password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'username',
      name: 'user',
      password: '',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('password missing'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

})

after(async () => {
  await mongoose.connection.close()
})