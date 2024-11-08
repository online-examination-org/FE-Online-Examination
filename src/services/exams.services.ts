import { CreateExamBody } from '@/types/type'
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
