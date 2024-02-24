import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import Notification from "./components/Notification.jsx"
import BlogForm from "./components/BlogForm.jsx"
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from "./components/LoginForm.jsx";
import Togglable from "./components/Togglable.jsx";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()

    loginService.login({username, password})
      .then(user => {
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        blogService.getAll()
          .then(allBlogs => {
            setBlogs(allBlogs)
            setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      })
  }

  const updateBlog = (id, blogObject) => {
    blogService.update(id, blogObject)
      .then(returnedBlog => {
        blogService.getAll()
          .then(allBlogs => {
            setBlogs(allBlogs)
            setSuccessMessage(`blog ${returnedBlog.title} updated`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({target}) => setUsername(target.value)}
          handlePasswordChange={({target}) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const blogsList = () => (
    <div>
      <p>{user.name} logged in
        <button type={"button"} onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel={'new blog'}>
        <BlogForm addBlog={addBlog}/>
      </Togglable>
      <br/>
      {blogs.sort((a, b) => {
        return b.likes - a.likes
      }).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      )}
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} classname={'error'}/>
      <Notification message={successMessage} classname={'success'}/>

      {!user && loginForm()}
      {user && blogsList()}

    </div>
  )
}

export default App