import { CreateQuestionBody, EditQuestionBody } from '@/types/type'
import http from './http'

const baseUrl = '/questions'

export const getQuestions = (examId: number | string) => {
  return http.get(`${baseUrl}/view`, {
    params: {
      exam_id: examId
    }
  })
}

export const createQuestion = (payload: CreateQuestionBody[]) => {
  return http.post(`${baseUrl}/add`, payload)
}

export const editQuestion = (id: string, exam_id: string, payload: EditQuestionBody) => {
  const params = new URLSearchParams({
    id,
    exam_id
  })
  return http.put(`${baseUrl}/update?${params.toString()}`, payload)
}

export const deleteQuestion = (id: string, exam_id: string) => {
  const params = new URLSearchParams({
    id,
    exam_id
  })
  return http.delete(`${baseUrl}/delete?${params.toString()}`)
}
