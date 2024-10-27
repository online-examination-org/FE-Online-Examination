import './App.css'
import Login from '@/pages/Login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import PublicRoutes from './layouts/PublicRoutes'
import ExamList from './pages/ExamList'
import MainLayout from './layouts/MainLayout'
import ExamDetail from './pages/ExamDetail'
import StudentInfo from './pages/StudentInfo'
import TestStartPage from './pages/StartTest'
import QuizForm from './pages/QuizForm'

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
          <Route path='/join' element={<StudentInfo />} />
          <Route path='/start' element={<TestStartPage />} />
          <Route path='/make-test' element={<QuizForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
