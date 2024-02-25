import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleOnLike = () => {
    console.log(blog.title, 'liked')
    const newObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user?.id,
      likes: blog.likes + 1
    }
    console.log(newObject)
    updateBlog(blog.id, newObject)
  }

  const handleOnRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div className={'blog-title-author'}>
        {blog.title} {blog.author}
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className={'blog-extra-info'}>
        <button onClick={toggleVisibility}>hide</button>
        <div className={'blog-url'}>
          {blog.url}
        </div>
        <div className={'blog-likes'}>
          likes {blog.likes}
          <button onClick={handleOnLike}>like</button>
        </div>
        <div className={'user-username'}>
          {blog.user?.username || 'anonymous'}
        </div>
        <div>
          <button onClick={handleOnRemove}>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog