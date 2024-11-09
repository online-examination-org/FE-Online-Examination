import { Exam, LoginBody, Profile, RegisterBody } from '@/types/type'
import http from './http'

const baseUrl = '/teachers'

export const login = (payload: LoginBody) => {
  return http.post(`${baseUrl}/login`, payload)
}

export const register = (payload: RegisterBody) => {
  return http.post(`${baseUrl}/signup`, payload)
}

export const getProfile = () => {
  return http.get<Profile>(`${baseUrl}/info`)
}

export const getExams = () => {
  return http.get<Exam[]>(`${baseUrl}/exams`)
}

export const getExamResultDetail = (examResultId: number) => {
  const params = new URLSearchParams({
    examResultId: examResultId.toString()
  })
  return http.get(`${baseUrl}/result/detail?${params.toString()}`)
}
