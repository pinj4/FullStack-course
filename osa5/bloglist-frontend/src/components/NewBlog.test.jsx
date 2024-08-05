import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlog'

test('creating a new blog', async() => {
  const user = userEvent.setup()
  const handleAddBlog = vi.fn()


  const { container } = render(<NewBlog handleAddBlog={handleAddBlog} />)



  const title = container.querySelector('#title')
  const author = container.querySelector('#author')
  const url = container.querySelector('#url')
  const save = container.querySelector('#save')

  await user.type(title, 'testblog')
  await user.type(author, 'testauthor')
  await user.type(url, 'testurl')
  await user.click(save)

  expect(handleAddBlog.mock.calls).toHaveLength(1)
  expect(handleAddBlog).toHaveBeenCalledWith({
    title: 'testblog',
    author: 'testauthor',
    url: 'testurl',
    likes: 0
  })
})
