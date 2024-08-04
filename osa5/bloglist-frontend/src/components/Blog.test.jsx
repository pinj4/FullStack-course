import { render, screen } from '@testing-library/react'
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