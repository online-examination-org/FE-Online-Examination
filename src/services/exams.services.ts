import { CreateExamBody, UpdateExamProps } from '@/types/type'
import http from './http'
const baseUrl = '/exams'

export const createExam = (payload: CreateExamBody) => {
  return http.post(`${baseUrl}/add`, payload)
}

export const deleteExam = (examId: number) => {
  return http.delete(`${baseUrl}/${examId}`)
}

// export const updateExam = (payload: any) => {
//   return http.put(`${baseUrl}/update`, payload)
// }

export const updateExamInfo = (examId: any, payload: UpdateExamProps) => {
  return new Promise((resolve, reject) => {
    http
      .put(`${baseUrl}/update?id=${examId}`, payload) // `examId` as URL parameter, `payload` as body
      .then((response) => resolve(response.data))
      .catch((error) => reject(error.message))
  })
}
