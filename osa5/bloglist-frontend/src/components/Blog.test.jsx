import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('React patterns - Michael Chan')

  expect(element).toBeDefined()
})

test('clicking the show button reveals url, likes and the user', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 10,
    user: { username:'tester' }
  }

  const user = userEvent.setup()

  const { container } = render(<Blog blog={blog} />)

  const button = container.querySelector('#showBlog-button')
  await user.click(button)
  const content = container.querySelector('#showBlog-content')

  expect(content).toHaveTextContent('https://reactpatterns.com/')
  expect(content).toHaveTextContent('likes 10')
})

test('clicking "like" twice calls the like-function twice', async() => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 10,
    user: { username:'tester' }
  }

  const mockHandler = vi.fn()

  const user = userEvent.setup()

  const { container } = render(<Blog blog={blog} handleLike={mockHandler} />)

  const button = container.querySelector('#showBlog-button')
  await user.click(button)

  const like = container.querySelector('#like-button')
  await user.click(like)
  await user.click(like)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
