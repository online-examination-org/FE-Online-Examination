import { JoinQuizProps, saveQuizProps, StartQuizProps, SubmitQuizProps } from '@/types/type'
import http, { http2 } from './http'
const baseUrl = '/students'

export const joinQuiz = (payload: JoinQuizProps) => {
  return new Promise((resolve, reject) => {
    http
      .post(`exam-results/add`, payload)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
}

export const startQuiz = (payload: StartQuizProps) => {
  return new Promise((resolve, reject) => {
    http2
      .put(`/exam-results/update`, payload)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error.message))
  })
}

export const submitQuiz = (payload: SubmitQuizProps) => {
  return new Promise((resolve, reject) => {
    http2
      .post(`${baseUrl}/exam/submit`, payload)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error.message))
  })
}

export const saveQuiz = (payload: saveQuizProps) => {
  return new Promise((resolve, reject) => {
    http2
      .post(`${baseUrl}/exam/save`, payload)
      .then((response) => resolve(response?.data))
      .catch((error) => reject(error?.message))
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
