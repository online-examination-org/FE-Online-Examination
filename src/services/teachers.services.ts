import { LoginBody, RegisterBody } from '@/types/type'
import http from './http'

const baseUrl = '/teachers'

export const login = (payload: LoginBody) => {
  return http.post(`${baseUrl}/login`, payload)
}

export const register = (payload: RegisterBody) => {
  return http.post(`${baseUrl}/signup`, payload)
}
