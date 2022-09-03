import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import Auth from './components/views/Auth';
import DashBoard from './components/views/DashBoard';
import ProtectedRoute from './routes/ProtectedRoute';
import About from './components/views/About';
import Contact from './components/views/Contact';
import NoPage from './components/views/NoPage';
import PostProvider from './context/PostConext';
import "./App.css";


const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
          <Routes>
            <Route path='/' element={<NoPage />} />
            <Route path='/login' element={<Auth login={true} />} />
            <Route path='/register' element={<Auth />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/about' element={<About />} />
              <Route path='/dashboard' element={<DashBoard />} />
              <Route path='/contact' element={<Contact />} />
            </Route>
          </Routes>
        </Router>
      </PostProvider>
    </AuthProvider>
  )
}

export default App