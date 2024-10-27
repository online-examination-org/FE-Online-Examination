import './App.css'
import Login from '@/pages/Login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import PublicRoutes from './layouts/PublicRoutes'
import ExamList from './pages/ExamList'
import MainLayout from './layouts/MainLayout'
import ExamDetail from './pages/ExamDetail'

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route element={<MainLayout />}>
            <Route element={<PublicRoutes />}>
              <Route path='/' element={<ExamList />} />
              <Route path='/exam/:id' element={<ExamDetail />} />
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
