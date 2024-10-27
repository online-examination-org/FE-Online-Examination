// import { useState } from 'react'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// import { Label } from '@/components/ui/label'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { ChevronLeft, ChevronRight, Send } from 'lucide-react'
import quizData from '../dummy_datas/dummy_question'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ChevronLeft, ChevronRight, Send, Clock, Save } from 'lucide-react'

// Type definitions
export interface Question {
  id: number
  question: string
  type: 'multipleChoice' | 'shortQuestion'
  options?: string[]
  required: boolean
}

export interface Quiz {
  title: string
  description: string
  timeLimit: number
  questions: Question[]
}

interface Answers {
  [key: number]: string
}

interface QuizFormProps {
  quiz?: Quiz
  onSubmit?: (answers: Answers) => void
}

interface SubmissionData {
  timestamp: string
  quizTitle: string
  answers: Answers
  timeSpent: number
}

// Default quiz data
const defaultQuiz: Quiz = {
  title: 'Sample Quiz',
  description: 'This is a sample quiz',
  timeLimit: 30,
  questions: [
    {
      id: 1,
      question: 'What is your preferred JavaScript framework?',
      type: 'multipleChoice',
      options: ['React', 'Vue', 'Angular', 'Svelte'],
      required: true
    },
    {
      id: 2,
      question: 'Explain what is Virtual DOM in React?',
      type: 'shortQuestion',
      required: true
    }
  ]
}

const QuizForm = ({ quiz = defaultQuiz, onSubmit }: QuizFormProps) => {
  // State management
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [timeRemaining, setTimeRemaining] = useState<number>(quiz.timeLimit * 60)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')

  const questions = quizData.quiz.questions

  console.log(quizData)

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

  const showMessage = (message: string): void => {
    setAlertMessage(message)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  // Event handlers
  const handleAnswer = (value: string): void => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }))
  }

  const handleSubmit = async (): void => {
    setIsSubmitting(true)

    const unansweredRequired = questions.filter((question) => question.required && !answers[question.id])

    if (unansweredRequired.length > 0) {
      showMessage(`Please answer all required questions. ${unansweredRequired.length} questions remaining.`)
      setIsSubmitting(false)
      return
    }

    const submissionData: SubmissionData = {
      timestamp: new Date().toISOString(),
      quizTitle: quiz.title,
      answers,
      timeSpent: quiz.timeLimit * 60 - timeRemaining
    }

    try {
      if (onSubmit) {
        await onSubmit(answers)
      } else {
        console.log('Submitting answers:', submissionData)
        // Add your API call here
      }

      localStorage.removeItem('quizAnswers')
      showMessage('Quiz submitted successfully!')
    } catch (error) {
      showMessage('Error submitting quiz. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNext = (): void => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = (): void => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const goToQuestion = (index: number): void => {
    setCurrentQuestion(index)
  }

  const isQuestionAnswered = (questionId: number): boolean => {
    return !!answers[questionId]
  }

  return (
    <div className='container min-h-screen flex items-start justify-center mx-auto p-6 max-w-3xl'>
      {showAlert && (
        <Alert className='mb-4'>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}

      <Card className='w-full'>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <div>
              <CardTitle className='text-2xl'>{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </div>
            <div className='flex items-center gap-2 text-lg'>
              <Clock className='w-5 h-5' />
              <span className={`font-bold ${timeRemaining < 60 ? 'text-red-500' : ''}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className='space-y-6'>
          {/* Progress bar */}
          <div className='space-y-2'>
            <div className='flex justify-between text-sm text-gray-500'>
              <span>Progress</span>
              <span>{Math.round(calculateProgress())}%</span>
            </div>
            <Progress value={calculateProgress()} className='w-full' />
          </div>

          {/* Question Navigation */}
          <div className='flex flex-wrap gap-2 mb-6'>
            {questions.map((question, index) => (
              <Button
                key={question.id}
                variant={currentQuestion === index ? 'default' : 'outline'}
                className={`w-10 h-10 relative ${isQuestionAnswered(question.id) ? 'bg-green-100' : ''}`}
                onClick={() => goToQuestion(index)}
              >
                {index + 1}
                {question.required && <span className='absolute -top-1 -right-1 text-red-500 text-xs'>*</span>}
              </Button>
            ))}
          </div>

          {/* Current Question */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>
              Question {currentQuestion + 1}: {questions[currentQuestion].question}
              {questions[currentQuestion].required && <span className='text-red-500 ml-1'>*</span>}
            </h3>

            {questions[currentQuestion].type === 'multipleChoice' ? (
              <RadioGroup
                value={answers[questions[currentQuestion].id] || ''}
                onValueChange={handleAnswer}
                className='space-y-2'
              >
                {questions[currentQuestion].options?.map((option) => (
                  <div key={option} className='flex items-center space-x-2'>
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <Input
                type='text'
                placeholder='Enter your answer'
                value={answers[questions[currentQuestion].id] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
              />
            )}
          </div>
        </CardContent>

        <CardFooter className='flex justify-between'>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={handlePrevious} disabled={currentQuestion === 0}>
              <ChevronLeft className='w-4 h-4 mr-2' />
              Previous
            </Button>
            <Button variant='outline' onClick={handleNext} disabled={currentQuestion === questions.length - 1}>
              Next
              <ChevronRight className='w-4 h-4 ml-2' />
            </Button>
          </div>

          <div className='flex gap-2'>
            <Button variant='outline' onClick={() => showMessage('Progress saved!')}>
              <Save className='w-4 h-4 mr-2' />
              Save Progress
            </Button>

            {currentQuestion === questions.length - 1 && (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
                <Send className='w-4 h-4 ml-2' />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default QuizForm
