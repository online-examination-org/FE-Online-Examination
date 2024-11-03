import './App.css'
import Login from '@/pages/teacher/Login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import PublicRoutes from './layouts/PublicRoutes'
import MakeQuiz from './pages/student/MakeQuiz'
import StartQuiz from './pages/student/StartQuiz'
import JoinQuiz from './pages/student/JoinQuiz'
import StudentQuizResult from './pages/teacher/StudentQuizResult'
import MainLayout from './layouts/MainLayout'
import QuizLanding from './pages/teacher/QuizLanding/QuizLanding'
import QuizBoard from './pages/teacher/QuizBoard/QuizBoard'

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route element={<MainLayout />}>
            <Route element={<PublicRoutes />}>
              <Route path='/' element={<QuizLanding />} />
              <Route path='/quiz/:id' element={<QuizBoard />} />
              <Route path='/quiz/:id/student/:id' element={<StudentQuizResult />} />
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/join' element={<JoinQuiz />} />
          <Route path='/start' element={<StartQuiz />} />
          <Route path='/make-quiz' element={<MakeQuiz />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
