import { LoginBody, SubmitQuizProps } from '@/types/type'
import http from './http'

const baseUrl = '/students'

export const joinQuiz = (payload: LoginBody) => {
  return new Promise((resolve, reject) => {
    http
      .post(`${baseUrl}/login`, payload)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error.message))
  })
}

export const startQuiz = (payload: LoginBody) => {
  return new Promise((resolve, reject) => {
    http
      .post(`${baseUrl}/login`, payload)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error.message))
  })
}

export const submitQuiz = (payload: SubmitQuizProps) => {
  return new Promise((resolve, reject) => {
    http
      .post(`${baseUrl}/exam/submit`, payload)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error.message))
  })
}

export const saveQuiz = (payload: SubmitQuizProps) => {
  return new Promise((resolve, reject) => {
    http
      .post(`${baseUrl}/exam/submit`, payload)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error.message))
  })
}

export const getQuiz = (payload: SubmitQuizProps) => {
  return new Promise((resolve, reject) => {
    http
      .post(`${baseUrl}/exam/submit`, payload)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error.message))
  })
}
