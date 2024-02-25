import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe ('<BlogForm />', () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  test('calls event handler with correct details when a new blog is created', async () => {
    const component = render(
      <BlogForm addBlog={addBlog} />
    )

    const titleInput = component.container.querySelector('input[name="Title"]')
    const authorInput = component.container.querySelector('input[name="Author"]')
    const urlInput = component.container.querySelector('input[name="Url"]')
    const createButton = component.container.querySelector('button')

    await user.type(titleInput, 'Test Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'http://test.com')
    await user.click(createButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('Test Title')
    expect(addBlog.mock.calls[0][0].author).toBe('Test Author')
    expect(addBlog.mock.calls[0][0].url).toBe('http://test.com')
  })
})