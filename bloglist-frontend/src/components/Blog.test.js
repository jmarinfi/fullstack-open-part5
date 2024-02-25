import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 0,
    user: {
      id: 123,
      username: 'testuser'
    }
  }

  const mockUpdateBlog = jest.fn()
  const mockRemoveBlog = jest.fn()

  test('renders title and author, but not url or likes by default', () => {
    const { container } = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        removeBlog={mockRemoveBlog}
      />
    )

    const titleAndAuthor = container.querySelector('.blog-title-author')
    expect(titleAndAuthor).toBeInTheDocument()
    expect(titleAndAuthor).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(titleAndAuthor).not.toHaveStyle('display: none')

    const extraInfo = container.querySelector('.blog-extra-info')
    expect(extraInfo).toHaveStyle('display: none')
  })

  test('renders url and likes when the view button is clicked', async () => {
    const { container } = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        removeBlog={mockRemoveBlog}
      />
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const extraInfo = container.querySelector('.blog-extra-info')
    expect(extraInfo).not.toHaveStyle('display: none')
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const { container } = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        removeBlog={mockRemoveBlog}
      />
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
  })
})