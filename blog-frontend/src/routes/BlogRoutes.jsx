import { Route, Routes } from 'react-router-dom'
import NewPost from '../pages/NewPost/NewPost'
import Contact from '../pages/Contact/Contact'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Home from '../pages/Home/Home'

const BlogRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/NewPost' element={<NewPost />} />
      <Route path='/Contact' element={<Contact />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      {/* Catch-all route for 404 Not Found */}
      <Route path='*' element={<h1>404 Not Found</h1>} />
    </Routes>
  )
}

export default BlogRoutes

