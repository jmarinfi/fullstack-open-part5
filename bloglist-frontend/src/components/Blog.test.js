import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
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
})