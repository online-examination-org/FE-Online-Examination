import http from './http'
const baseUrl = '/exam-results'

export const getExamResults = (examId: number | string) => {
  return http.get(`${baseUrl}/${examId}`)
}
