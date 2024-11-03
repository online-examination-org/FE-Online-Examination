import { Navigate, Outlet } from 'react-router-dom'

export const TeacherRoutes = () => {
  const token = localStorage.getItem('access_token')
  const role = localStorage.getItem('role')
  return token && role === 'teacher' ? <Outlet /> : <Navigate to='/login' />
}

export const StudentRoutes = () => {
  const token = localStorage.getItem('access_token')
  const role = localStorage.getItem('role')
  return token && role === 'student' ? <Outlet /> : <Navigate to='/join' />
}
