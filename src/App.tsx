import './App.css'
import Login from '@/pages/Login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import PublicRoutes from './layouts/PublicRoutes'
import ExamList from './pages/ExamList'
import MainLayout from './layouts/MainLayout'
import ExamDetail from './pages/ExamDetail'
import QuizForm from './pages/QuizForm'
import CreateExam from './pages/CreateExam'
import TestGeneralInfo from './pages/TestGeneralInfo'
import JoinForm from './pages/JoinForm'

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route element={<MainLayout />}>
            <Route element={<PublicRoutes />}>
              <Route path='/' element={<ExamList />} />
              <Route path='/exam/:id' element={<ExamDetail />} />
              <Route path='/create-exam' element={<CreateExam />} />
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/join' element={<JoinForm />} />
          <Route path='/start' element={<TestGeneralInfo />} />
          <Route path='/make-test' element={<QuizForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
