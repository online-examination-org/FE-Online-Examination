/* eslint-disable @typescript-eslint/no-explicit-any */
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, AlertCircle, Award } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getExamResultDetail } from '@/services/teachers.services'

const StudentQuizResult = () => {
  const [results, setResults] = useState([])
  const [totalScore, setTotalScore] = useState(0)
  const { id } = useParams()

  const getAnswerStatus = (question, optionText) => {
    // Với câu hỏi multiple choice
    if (question.questionType === 'multipleChoice') {
      const isSelected = optionText === question.response // Đáp án học sinh chọn
      const isCorrectAnswer = optionText === question.answer // Đáp án đúng

      if (isSelected && isCorrectAnswer) return 'correct' // Chọn đúng
      if (isSelected && !isCorrectAnswer) return 'incorrect' // Chọn sai
      if (!isSelected && isCorrectAnswer) return 'shouldbe' // Đáp án đúng nhưng không chọn
      return 'neutral' // Các lựa chọn khác
    }
    return 'neutral'
  }

  useEffect(() => {
    if (id) {
      const fetchDetail = async () => {
        try {
          const response = await getExamResultDetail(parseInt(id))
          setResults(response.data)

          // Tính điểm tổng
          const correctCount = response.data.filter((q) => q.correct).length
          const scorePercentage = (correctCount / response.data.length) * 100
          setTotalScore(Math.round(scorePercentage))
        } catch (err) {
          console.log(err)
        }
      }
      fetchDetail()
    }
  }, [id])

  return (
    <div className='w-[1140px] mx-auto p-6'>
      {/* Quiz Header */}
      <Card className='mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-none'>
        <CardContent className='pt-6'>
          <div className='flex justify-between items-center mb-4'>
            <div>
              <h1 className='text-2xl font-bold text-gray-800'>Student Quiz Result</h1>
            </div>
            <div className='text-center'>
              <div className='flex items-center gap-2'>
                <Award className={`w-8 h-8 ${totalScore >= 70 ? 'text-green-500' : 'text-gray-400'}`} />
                <span className='text-3xl font-bold text-gray-800'>{totalScore}%</span>
              </div>
              <p className='text-sm text-gray-500 mt-1'>Passing score: 70%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <div className='space-y-6'>
        {results.map((question: any, index) => (
          <Card key={index} className='transition-all duration-200 hover:shadow-md'>
            <CardContent className='pt-6'>
              {/* Question Header */}
              <div className='flex justify-between items-start mb-4'>
                <div className='flex-1'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Badge variant={question.questionType === 'multipleChoice' ? 'default' : 'secondary'}>
                      {question.questionType === 'multipleChoice' ? 'Multiple Choice' : 'Short Answer'}
                    </Badge>
                    <Badge className={question.correct ? 'bg-blue-300 text-black' : 'bg-red-100 text-black'}>
                      {question.correct ? 'Correct' : 'Incorrect'}
                    </Badge>
                  </div>
                  <h3 className='text-lg font-medium text-gray-800'>
                    Question {index + 1}: {question.questionText}
                  </h3>
                </div>
              </div>

              <div className='mt-4 pl-4'>
                {question.questionType === 'multipleChoice' ? (
                  <RadioGroup value={question.response} className='space-y-3'>
                    {Object.entries(question.choices).map(([key, optionText]) => {
                      const status = getAnswerStatus(question, optionText)
                      return (
                        <div
                          key={key}
                          className={`flex items-center space-x-3 p-3 rounded-lg border
                            ${
                              status === 'correct'
                                ? 'bg-green-50 border-green-200'
                                : status === 'incorrect'
                                  ? 'bg-red-50 border-red-200'
                                  : status === 'shouldbe'
                                    ? 'bg-blue-50 border-blue-200'
                                    : 'bg-gray-50 border-gray-200'
                            }
                          `}
                        >
                          <RadioGroupItem value={optionText} id={`${index}-${key}`} disabled={true} />
                          <Label htmlFor={`${index}-${key}`} className='flex-1 font-normal'>
                            {key}. {optionText}
                          </Label>
                          {status === 'correct' && <CheckCircle2 className='w-5 h-5 text-green-500' />}
                          {status === 'incorrect' && <XCircle className='w-5 h-5 text-red-500' />}
                          {status === 'shouldbe' && <AlertCircle className='w-5 h-5 text-blue-500' />}
                        </div>
                      )
                    })}
                  </RadioGroup>
                ) : (
                  <div className='space-y-3'>
                    <div className='p-4 rounded-lg bg-gray-50 border border-gray-200'>
                      <p className='text-sm text-gray-500 mb-2'>Your Answer:</p>
                      <Textarea className='min-h-[100px] bg-white' value={question.response || ''} disabled={true} />
                    </div>
                    <div
                      className={`p-4 rounded-lg ${question.correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                    >
                      <p className={`text-sm mb-2 ${question.correct ? 'text-green-600' : 'text-red-600'}`}>
                        Correct Answer:
                      </p>
                      <p className='text-gray-800'>{question.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default StudentQuizResult
