import {useState} from "react"

const Blog = ({blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

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
      <div>
        {blog.title} {blog.author}
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button onClick={handleOnLike}>like</button>
        </div>
        <div>
          {blog.user?.username || 'anonymous'}
        </div>
        <div>
          <button onClick={handleOnRemove}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog