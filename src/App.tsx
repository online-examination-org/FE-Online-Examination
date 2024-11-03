import './App.css'
import Login from '@/pages/Login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import PublicRoutes from './layouts/PublicRoutes'
import ExamList from './pages/ExamList'
import MainLayout from './layouts/MainLayout'
import ExamDetail from './pages/ExamDetail'
import QuizForm from './pages/QuizForm'
import TestGeneralInfo from './pages/TestGeneralInfo'
import JoinForm from './pages/JoinForm'
import ExamResuiltDetail from './pages/ExamResuiltDetail'
import { TeacherRoutes } from './layouts/PrivateRoutes'

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route element={<MainLayout />}>
            <Route element={<TeacherRoutes />}>
              <Route path='/' element={<ExamList />} />
              <Route path='/exam/:id' element={<ExamDetail />} />
              <Route path='/exam/:id/student/:id' element={<ExamResuiltDetail />} />
            </Route>
          </Route>
          <Route element={<PublicRoutes />}>
            <Route path='/login' element={<Login />} />
          </Route>

          <Route path='/join' element={<JoinForm />} />
          <Route path='/start' element={<TestGeneralInfo />} />
          <Route path='/make-test' element={<QuizForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
