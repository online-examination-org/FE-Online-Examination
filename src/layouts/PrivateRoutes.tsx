import { Navigate, Outlet } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  email: string
  exp: number
  iat: number
  id: number
  name: string
  role: string
}

export const TeacherRoutes = () => {
  const token = localStorage.getItem('access_token')
  if (!token) return <Navigate to='/login' />
  const decoded = jwtDecode<DecodedToken>(token)
  return decoded.role === 'teacher' ? <Outlet /> : <Navigate to='/login' />
}

export const StudentRoutes = () => {
  const token = localStorage.getItem('access_token')
  if (!token) return <Navigate to='/join' />
  const decoded = jwtDecode<DecodedToken>(token)
  return decoded.role === 'student' ? <Outlet /> : <Navigate to='/login' />
}
