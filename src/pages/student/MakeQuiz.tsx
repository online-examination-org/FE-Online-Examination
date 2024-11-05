import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ChevronLeft, ChevronRight, Send, Clock, LayoutGrid, List } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import quizData from '../../dummy_datas/quiz_data.json'
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
export interface Question {
  id: number
  question: string
  type: 'multipleChoice' | 'shortQuestion'
  options?: string[]
  required: boolean
}

export interface QuizProps {
  title: string
  description: string
  timeLimit: number
  questions: Question[]
}

interface Answers {
  [key: number]: string
}

// interface MakeQuizProps {
//   quiz?: QuizProps
//   onSubmit?: (answers: Answers) => void
// }

interface SubmissionData {
  timestamp: string
  quizTitle: string
  answers: Answers
  timeSpent: number
}

const MakeQuiz = () => {
  const questionRefs = useRef<(HTMLDivElement | null)[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [timeRemaining, setTimeRemaining] = useState<number>(quizData.quiz.timeLimit * 60)
  // const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [viewMode, setViewMode] = useState<'card' | 'list'>('list')
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [exam, setExam] = useState<any>()
  const navigate = useNavigate()
  const questions = quizData.quiz.questions

  useEffect(() => {
    const fetchQuestions = async () => {
      setExam(quizData.quiz)
    }
    fetchQuestions()
  })

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

  // Auto-save effect
  useEffect(() => {
    const savedAnswers = localStorage.getItem('quizAnswers')
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('quizAnswers', JSON.stringify(answers))
  }, [answers])

  // Helper functions
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const calculateProgress = (): number => {
    const answeredQuestions = Object.keys(answers).length
    return (answeredQuestions / questions.length) * 100
  }

  const handleTimeUp = (): void => {
    setAlertMessage('Time is up! Submitting your answers...')
    setShowAlert(true)
    handleSubmit()
  }

  // const showMessage = (message: string): void => {
  //   setAlertMessage(message)
  //   setShowAlert(true)
  //   setTimeout(() => setShowAlert(false), 3000)
  // }

  // Event handlers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAnswer = (value: string, question_id: any = null): void => {
    setAnswers((prev) => ({
      ...prev,
      [question_id]: value
    }))
  }

  const handleSubmit = async () => {
    const submissionData: SubmissionData = {
      timestamp: new Date().toISOString(),
      quizTitle: exam.title,
      timeSpent: exam.timeLimit * 60 - timeRemaining,
      answers
    }
    localStorage.removeItem('quizAnswers')
    console.log('Submitting answers:', submissionData)
    navigate('/completed')
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
    return !!answers[questionId]
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
    <div className='w-1/4 p-4 border sticky top-2 flex-grow rounded-lg'>
      {/* Progress bar */}
      <div className='space-y-2 mb-5'>
        <div className='flex justify-between text-sm text-gray-500'>
          <span>Progress</span>
          <span>{Math.round(calculateProgress())}%</span>
        </div>
        <Progress value={calculateProgress()} className='w-full' />
      </div>

      {/* Question Navigation */}
      <div className='flex flex-wrap gap-2 mb-6'>
        {questions.map((question) => (
          <Button
            key={question.id}
            variant={currentQuestionIndex === question.id ? 'default' : 'outline'}
            className={`w-10 h-10 relative ${isQuestionAnswered(question.id) ? 'bg-green-200' : ''}`}
            onClick={() => goToQuestion(question.id)}
          >
            {question.id + 1}
            {question.required && <span className='absolute -top-1 -right-1 text-red-500 text-xs'>*</span>}
          </Button>
        ))}
      </div>
      {/* Quiz Timer */}
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

  return (
    <div className='container min-h-screen flex flex-col items-start justify-start mx-auto p-6 max-w-[1204px]'>
      {showAlert && (
        <Alert className='mb-4'>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}

      <ViewToggle />

      <div className='flex items-start gap-5 w-full'>
        <Card className='w-3/4 flex-grow'>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <div>
                <CardTitle className='text-2xl'>{exam?.title}</CardTitle>
                <CardDescription>{exam?.description}</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className='space-y-6'>
            {/* card view */}
            {viewMode === 'card' && (
              <div className='space-y-4 min-h-[225px] p-3 border'>
                <h3 className='text-lg font-medium'>
                  Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}
                  {questions[currentQuestionIndex].required && <span className='text-red-500 ml-1'>*</span>}
                </h3>
                <div className='p-2'>
                  {questions[currentQuestionIndex].type === 'multipleChoice' ? (
                    <RadioGroup
                      value={answers[currentQuestionIndex] || ''}
                      onValueChange={(value) => handleAnswer(value, currentQuestionIndex)}
                      className='space-y-0'
                    >
                      {questions[currentQuestionIndex].options?.map((option) => (
                        <div
                          key={option}
                          className='flex items-center space-x-2 hover:bg-gray-100 h-[30px] rounded-md'
                          onClick={() => handleAnswer(option, currentQuestionIndex)}
                        >
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option} className='font-normal cursor-pointer'>
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <Textarea
                      className='min-h-[150px]'
                      placeholder='Enter your answer'
                      value={answers[currentQuestionIndex] || ''}
                      onChange={(e) => handleAnswer(e.target.value, currentQuestionIndex)}
                    />
                  )}
                </div>
              </div>
            )}

            {/* list view */}
            {viewMode === 'list' && (
              <div className='space-y-8'>
                {questions.map((question) => (
                  <div className='rounded-lg mb-5 p-3 border' ref={(el) => (questionRefs.current[question.id] = el)}>
                    <h3 className='text-lg font-medium mb-3'>
                      Question {question.id + 1}: {question.question}
                      {question.required && <span className='text-red-500 ml-1'>*</span>}
                    </h3>
                    <div key={question.id} className={`p-2 rounded-lg bg-white`} id={`question-${question.id}`}>
                      {question.type === 'multipleChoice' ? (
                        <RadioGroup
                          value={answers[question.id] || ''}
                          onValueChange={(value) => handleAnswer(value, question.id)}
                          className='space-y-0'
                        >
                          {question.options?.map((option) => (
                            <div
                              key={option}
                              className='flex items-center space-x-2 hover:bg-gray-100 h-[30px] rounded-md'
                              onClick={() => handleAnswer(option, question.id)}
                            >
                              <RadioGroupItem
                                value={option}
                                id={option}
                                className={`${option === answers[question.id] ? 'bg-blue-400 text-white' : ''}`}
                              />
                              <Label htmlFor={option} className='font-normal cursor-pointer'>
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      ) : (
                        <Textarea
                          className='min-h-[100px]'
                          placeholder='Enter your answer'
                          value={answers[question.id] || ''}
                          onChange={(e) => {
                            handleAnswer(e.target.value, question.id)
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
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
                    <span className='font-bold pr-2'>Questions answered:</span> {Object.keys(answers).length} of{' '}
                    {questions.length}
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
