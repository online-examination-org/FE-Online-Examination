/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ChevronLeft, ChevronRight, Send, Clock, LayoutGrid, List } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { useNavigate } from 'react-router-dom'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { updateQuestionResponse } from '@/store/slices/questionSlice'
import { saveQuizProps } from '@/types/type'
import { saveQuiz, submitQuiz } from '@/services/students.services'
import { useToast } from '@/hooks/use-toast'

interface Question {
  questionId: number
  questionText: string
  questionType: 'multipleChoice' | 'shortQuestion'
  choices?: {
    [key: string]: string
  }
  examResultDetailId: number | null
  response: string | null
}

const MakeQuiz = () => {
  const dispatch = useDispatch()
  const questions = useSelector((state: any) => state.questions.questions)
  const exam = useSelector((state: any) => state.exam)
  const questionRefs = useRef<(HTMLDivElement | null)[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [timeRemaining, setTimeRemaining] = useState<number>(() => {
    const endTime = localStorage.getItem('end_time')
    return endTime ? Math.floor((new Date(endTime).getTime() - new Date().getTime()) / 1000) : 3600 // Default 1 hour
  })
  const [localTextAnswers, setLocalTextAnswers] = useState<{ [key: number]: string }>({})
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [viewMode, setViewMode] = useState<'card' | 'list'>('list')
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Helper functions
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleMultipleChoiceAnswer = async (value: string, questionId: number): Promise<void> => {
    try {
      dispatch(updateQuestionResponse({ questionId, response: value }))

      const payload: saveQuizProps = {
        question_id: questionId,
        response: value
      }

      await saveQuiz(payload)
    } catch (error) {
      console.error('Failed to save answer:', error)
      dispatch(updateQuestionResponse({ questionId, response: null }))
      // toast.toast({ description: 'Failed to save your answer', variant: 'destructive' })
    }
  }

  // Handle text answer changes - local state only
  const handleTextChange = (value: string, questionId: number) => {
    setLocalTextAnswers((prev) => ({ ...prev, [questionId]: value }))
    // Update Redux for UI consistency, but don't save to API yet
    dispatch(updateQuestionResponse({ questionId, response: value }))
  }

  // Handle text answer blur - save to API
  const handleTextBlur = async (questionId: number) => {
    const value = localTextAnswers[questionId]
    if (value === undefined) return

    try {
      const payload: saveQuizProps = {
        question_id: questionId,
        response: value
      }

      await saveQuiz(payload)
      toast.toast({
        description: 'Answer saved successfully',
        variant: 'default'
      })
    } catch (error) {
      console.error('Failed to save answer:', error)
    }
  }

  const calculateProgress = (): number => {
    const answeredQuestions = questions.filter((q: any) => q.response !== null).length
    return (answeredQuestions / questions.length) * 100
  }

  const handleTimeUp = (): void => {
    setAlertMessage('Time is up! Submitting your answers...')
    setShowAlert(true)
    handleSubmit()
  }

  const handleSubmit = async () => {
    try {
      const res = await submitQuiz({ finish_at: new Date().toISOString() })
      if (res) console.log(res)
      localStorage.setItem('finish_at', new Date().toISOString())
      navigate('/completed')
      toast.toast({ description: 'Submit Exam successfully' })
    } catch (error) {
      console.log(error)
    }
  }

  const handleNext = (): void => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePrevious = (): void => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const goToQuestion = (index: number): void => {
    setCurrentQuestionIndex(index)
    questionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const isQuestionAnswered = (questionId: number): boolean => {
    const question = questions.find((q: any) => q.questionId === questionId)
    return question?.response !== null
  }

  const ViewToggle = () => (
    <div className='flex gap-2 justify-end mb-4'>
      <Button variant={viewMode === 'list' ? 'default' : 'outline'} size='sm' onClick={() => setViewMode('list')}>
        <List className='h-4 w-4 mr-2' />
        List View
      </Button>
      <Button variant={viewMode === 'card' ? 'default' : 'outline'} size='sm' onClick={() => setViewMode('card')}>
        <LayoutGrid className='h-4 w-4 mr-2' />
        Card View
      </Button>
    </div>
  )

  const QuizPanels = () => (
    <div className='w-full md:w-1/4 p-4 border block md:sticky top-2 flex-grow rounded-lg'>
      <div className='space-y-2 mb-5'>
        <div className='flex justify-between text-sm text-gray-500'>
          <span>Progress</span>
          <span>{Math.round(calculateProgress())}%</span>
        </div>
        <Progress value={calculateProgress()} className='w-full' />
      </div>

      <div className='flex flex-wrap gap-2 mb-6'>
        {questions.map((question: any, index: any) => (
          <Button
            key={question.questionId}
            variant={currentQuestionIndex === index ? 'default' : 'outline'}
            className={`w-10 h-10 relative ${isQuestionAnswered(question.questionId) ? 'bg-green-200' : ''}`}
            onClick={() => goToQuestion(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 text-lg'>
          <Clock className='w-5 h-5' />
          <span className={`font-bold ${timeRemaining < 60 ? 'text-red-500' : ''}`}>{formatTime(timeRemaining)}</span>
        </div>
        <Button onClick={() => setShowSubmitDialog(true)}>
          Submit
          <Send className='w-4 h-4 ml-2' />
        </Button>
      </div>
    </div>
  )

  const renderQuestion = (question: Question, index: number) => {
    return (
      <div
        className='rounded-lg mb-5 p-3 border'
        ref={(el) => (questionRefs.current[index] = el)}
        key={question.questionId}
      >
        <h3 className='text-lg font-medium mb-3'>
          Question {index + 1}: {question.questionText}
        </h3>
        <div className='p-2 rounded-lg bg-white'>
          {question.questionType === 'multipleChoice' ? (
            <RadioGroup
              value={question.response || ''}
              onValueChange={(value) => handleMultipleChoiceAnswer(value, question.questionId)}
              className='space-y-0'
            >
              {Object.entries(question.choices || {}).map(([key, value]) => (
                <div
                  key={key}
                  className='flex items-center space-x-2 hover:bg-gray-100 h-[30px] rounded-md'
                  onClick={() => handleMultipleChoiceAnswer(value, question.questionId)}
                >
                  <RadioGroupItem
                    value={value}
                    id={`${question.questionId}-${key}`}
                    className={`${value === question.response ? 'bg-blue-400 text-white' : ''}`}
                  />
                  <Label htmlFor={`${question.questionId}-${key}`} className='font-normal cursor-pointer'>
                    {key}. {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <Textarea
              className='min-h-[100px]'
              placeholder='Enter your answer'
              value={localTextAnswers[question.questionId] ?? question.response ?? ''}
              onChange={(e) => handleTextChange(e.target.value, question.questionId)}
              onBlur={() => handleTextBlur(question.questionId)}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className='container min-h-screen flex flex-col items-start justify-start mx-auto p-6 max-w-[1204px]'>
      {showAlert && (
        <Alert className='mb-4'>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}

      <ViewToggle />

      <div className='flex items-start gap-5 w-full flex-wrap-reverse'>
        <Card className='w-full md:w-3/4 flex-grow'>
          <CardHeader>
            <CardTitle className='text-2xl'>{exam.examGetResponse.title}</CardTitle>
            <CardDescription>Complete all questions before submitting</CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            {viewMode === 'card' ? (
              <div className='space-y-4 min-h-[225px] p-3 border'>
                {questions[currentQuestionIndex] &&
                  renderQuestion(questions[currentQuestionIndex], currentQuestionIndex)}
              </div>
            ) : (
              <div className='space-y-8'>
                {questions.map((question: any, index: any) => renderQuestion(question, index))}
              </div>
            )}
          </CardContent>

          <CardFooter className='flex justify-between'>
            {viewMode === 'card' && (
              <div className='flex gap-2'>
                <Button variant='outline' onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                  <ChevronLeft className='w-4 h-4 mr-2' />
                  Previous
                </Button>
                <Button variant='outline' onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
                  Next
                  <ChevronRight className='w-4 h-4 ml-2' />
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>

        <QuizPanels />

        <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Submit Quiz</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to submit your quiz?
                <div className='mt-4'>
                  <div className='text-sm'>
                    <span className='font-bold pr-2'>Time remaining:</span> {formatTime(timeRemaining)}
                  </div>
                  <div className='text-sm mt-2'>
                    <span className='font-bold pr-2'>Questions answered:</span>{' '}
                    {questions.filter((q: any) => q.response !== null).length} of {questions.length}
                  </div>
                  <div className='mt-4 text-sm text-muted-foreground'>
                    Note: You cannot modify your answers after submission.
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit} className='bg-primary hover:bg-primary/90'>
                Submit Quiz
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default MakeQuiz
