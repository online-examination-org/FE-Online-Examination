import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, AlertCircle, Award } from 'lucide-react'
import quizAnsData from '../../dummy_datas/quiz_ans_data.json'

const StudentQuizResult = () => {
  const { quiz, totalScore, passingScore } = quizAnsData
  const questions = quiz.questions

  const getAnswerStatus = (question: any, option: string) => {
    if (question.type === 'multipleChoice') {
      const isSelected = option === question.correctAnswer
      const isCorrectAnswer = option === question.actualCorrectAnswer

      if (isSelected && isCorrectAnswer) return 'correct'
      if (isSelected && !isCorrectAnswer) return 'incorrect'
      if (!isSelected && isCorrectAnswer) return 'shouldbe'
      return 'neutral'
    }
    return 'neutral'
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      {/* Quiz Header */}
      <Card className='mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-none'>
        <CardContent className='pt-6'>
          <div className='flex justify-between items-center mb-4'>
            <div>
              <h1 className='text-2xl font-bold text-gray-800'>{quiz.title}</h1>
              <p className='text-gray-600 mt-1'>{quiz.description}</p>
            </div>
            <div className='text-center'>
              <div className='flex items-center gap-2'>
                <Award className={`w-8 h-8 ${totalScore >= passingScore ? 'text-green-500' : 'text-gray-400'}`} />
                <span className='text-3xl font-bold text-gray-800'>{totalScore}%</span>
              </div>
              <p className='text-sm text-gray-500 mt-1'>Passing score: {passingScore}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <div className='space-y-6'>
        {questions.map((question: any) => (
          <Card key={question.id} className='transition-all duration-200 hover:shadow-md'>
            <CardContent className='pt-6'>
              {/* Question Header */}
              <div className='flex justify-between items-start mb-4'>
                <div className='flex-1'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Badge variant={question.type === 'multipleChoice' ? 'default' : 'secondary'}>
                      {question.type === 'multipleChoice' ? 'Multiple Choice' : 'Short Answer'}
                    </Badge>
                  </div>
                  <h3 className='text-lg font-medium text-gray-800'>
                    Question {question.id + 1}: {question.question}
                  </h3>
                </div>
                <Badge variant={question.isCorrect ? 'default' : 'destructive'} className='ml-4'>
                  {question.score || 0}/{question.maxScore || 1} points
                </Badge>
              </div>

              <div className='mt-4 pl-4'>
                {question.type === 'multipleChoice' ? (
                  <RadioGroup value={question.correctAnswer} className='space-y-3'>
                    {question.options?.map((option: string) => {
                      const status = getAnswerStatus(question, option)
                      return (
                        <div
                          key={option}
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
                          <RadioGroupItem value={option} id={option} disabled={true} />
                          <Label htmlFor={option} className='flex-1 font-normal'>
                            {option}
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
                      <Textarea
                        className='min-h-[100px] bg-white'
                        value={question.correctAnswer || ''}
                        disabled={true}
                      />
                    </div>
                    {question.actualCorrectAnswer && (
                      <div className='p-4 rounded-lg bg-green-50 border border-green-200'>
                        <p className='text-sm text-green-600 mb-2'>Correct Answer:</p>
                        <p className='text-gray-800'>{question.actualCorrectAnswer}</p>
                      </div>
                    )}
                  </div>
                )}

                {question.feedback && (
                  <div className='mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200'>
                    <p className='text-sm text-blue-600 mb-1'>Feedback:</p>
                    <p className='text-gray-800'>{question.feedback}</p>
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
