/* eslint-disable @typescript-eslint/no-explicit-any */
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Pencil, Plus } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CreateQuestionBody, EditQuestionBody, Question } from '@/types/type'
import { createQuestion, editQuestion, deleteQuestion } from '@/services/questions.services'

interface CreateExamProps {
  questions: Question[]
  exam_id: number | string
  setRefresh: () => void
}

interface QuestionState {
  id: string | number
  questionText: string
  questionType: 'multipleChoice' | 'shortQuestion'
  choices: string[]
  answer: string
  shortAnswer: string
  isEditing: boolean
}

const transformQuestionForAPI = (question: QuestionState) => {
  const baseData = {
    questionText: question.questionText,
    questionType: question.questionType
  }

  if (question.questionType === 'multipleChoice') {
    const letters = ['A', 'B', 'C', 'D']
    const choices = Object.fromEntries(question.choices.map((choice, index) => [letters[index], choice]))

    return {
      ...baseData,
      choices,
      answer: question.choices[parseInt(question.answer)]
    }
  }

  return {
    ...baseData,
    answer: question.shortAnswer
  }
}

const QuestionItem = ({
  question,
  questionNumber,
  onDelete,
  onSave,
  onEdit,
  onQuestionChange,
  errors
}: {
  question: QuestionState
  questionNumber: number
  onDelete: (id: string | number) => void
  onSave: (question: QuestionState) => void
  onEdit: (id: string | number) => void
  onQuestionChange: (id: string | number, field: string, value: any) => void
  errors: Record<string, string>
}) => {
  return (
    <div className='w-full mb-7 px-3'>
      <Card className='w-full rounded-lg'>
        <CardHeader>
          <div className='flex items-center justify-between gap-6'>
            <div className='flex items-center gap-4 flex-1'>
              <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium'>
                {questionNumber}
              </div>

              {question.isEditing ? (
                <>
                  <Input
                    value={question.questionText}
                    onChange={(e) => onQuestionChange(question.id, 'questionText', e.target.value)}
                    className={errors.questionText ? 'border-red-500' : ''}
                  />
                  <Select
                    value={question.questionType}
                    onValueChange={(value) => {
                      onQuestionChange(question.id, 'questionType', value)
                      onQuestionChange(question.id, 'answer', '')
                      onQuestionChange(question.id, 'shortAnswer', '')
                    }}
                  >
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='multipleChoice'>Multiple choice</SelectItem>
                      <SelectItem value='shortQuestion'>Short answer</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              ) : (
                <>
                  <div className='flex-1'>
                    <div className='font-medium'>{question.questionText}</div>
                    <div className='text-sm text-gray-500'>
                      {question.questionType === 'multipleChoice' ? 'Multiple choice' : 'Short answer'}
                    </div>
                  </div>
                  <Button variant='ghost' size='icon' onClick={() => onEdit(question.id)}>
                    <Pencil className='w-4 h-4' />
                  </Button>
                </>
              )}
            </div>
          </div>
          {errors.questionText && <div className='text-red-500 text-sm mt-1'>{errors.questionText}</div>}
        </CardHeader>
        <CardContent className='space-y-6'>
          {question.questionType === 'multipleChoice' ? (
            <div className='space-y-4'>
              <RadioGroup
                className='space-y-2'
                value={question.answer}
                onValueChange={(value) => onQuestionChange(question.id, 'answer', value)}
              >
                {question.choices.map((choice, choiceIndex) => (
                  <div className='flex items-center space-x-2' key={choiceIndex}>
                    <RadioGroupItem value={choiceIndex.toString()} disabled={!question.isEditing} />
                    {question.isEditing ? (
                      <Input
                        value={choice}
                        onChange={(e) => {
                          const newChoices = [...question.choices]
                          newChoices[choiceIndex] = e.target.value
                          onQuestionChange(question.id, 'choices', newChoices)
                        }}
                        className={errors.choices ? 'border-red-500' : ''}
                      />
                    ) : (
                      <div className='px-3 py-2'>{choice}</div>
                    )}
                  </div>
                ))}
              </RadioGroup>
              {errors.answer && <div className='text-red-500 text-sm'>{errors.answer}</div>}
              {errors.choices && <div className='text-red-500 text-sm'>{errors.choices}</div>}
            </div>
          ) : (
            <div>
              <Textarea
                placeholder='Enter the answer'
                value={question.shortAnswer}
                onChange={(e) => onQuestionChange(question.id, 'shortAnswer', e.target.value)}
                className={errors.shortAnswer ? 'border-red-500' : ''}
                disabled={!question.isEditing}
              />
              {errors.shortAnswer && <div className='text-red-500 text-sm mt-1'>{errors.shortAnswer}</div>}
            </div>
          )}
        </CardContent>
        {question.isEditing && (
          <CardFooter>
            <div className='flex gap-4 justify-end w-full'>
              <Button
                variant='outline'
                className='border border-red-500 text-red-500'
                onClick={() => onDelete(question.id)}
              >
                Delete
              </Button>
              <Button onClick={() => onSave(question)}>Save</Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

const CreateExam = ({ questions: initialQuestions, exam_id, setRefresh }: CreateExamProps) => {
  const createInitialQuestion = (id: string | number): QuestionState => ({
    id,
    questionText: 'New question',
    questionType: 'multipleChoice',
    choices: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    answer: '',
    shortAnswer: '',
    isEditing: true
  })

  const transformInitialQuestions = (): QuestionState[] => {
    if (!initialQuestions?.length) return []

    return initialQuestions.map((q) => ({
      id: q.questionId,
      questionText: q.questionText,
      questionType: q.questionType,
      choices: q.questionType === 'multipleChoice' ? Object.values(q.choices || {}) : [],
      answer:
        q.questionType === 'multipleChoice'
          ? Object.entries(q.choices || {})
              .findIndex(([_, value]) => value === q.answer)
              .toString()
          : '',
      shortAnswer: q.questionType === 'shortQuestion' ? q.answer : '',
      isEditing: false
    }))
  }

  const [questions, setQuestions] = useState<QuestionState[]>(transformInitialQuestions)
  const [errors, setErrors] = useState<Record<string | number, Record<string, string>>>({})
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [nextId, setNextId] = useState(1)

  useEffect(() => {
    if (questions.length === 0) {
      handleAddQuestion()
    }
  }, [])

  const validateQuestion = (question: QuestionState) => {
    const newErrors: Record<string, string> = {}

    if (!question.questionText.trim()) {
      newErrors.questionText = 'Question text is required'
    }

    if (question.questionType === 'multipleChoice') {
      if (question.answer === '') {
        newErrors.answer = 'Please select an answer'
      }
      if (question.choices.some((choice) => !choice.trim())) {
        newErrors.choices = 'All options must be filled'
      }
    } else if (question.questionType === 'shortQuestion') {
      if (!question.shortAnswer?.trim()) {
        newErrors.shortAnswer = 'Answer is required'
      }
    }

    return newErrors
  }

  const handleAddQuestion = () => {
    const hasUnsavedQuestions = questions.some((q) => q.isEditing)
    if (hasUnsavedQuestions) {
      alert('Please save the current question before adding a new one')
      return
    }

    const newId = `new-${nextId}`
    setNextId((prev) => prev + 1)
    const newQuestion = createInitialQuestion(newId)
    setQuestions((prev) => [...prev, newQuestion])

    setTimeout(() => {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
        if (scrollContainer) {
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: 'smooth'
          })
        }
      }
    }, 100)
  }

  const handleQuestionChange = (questionId: string | number, field: string, value: any) => {
    setQuestions((prev) => prev.map((q) => (q.id === questionId ? { ...q, [field]: value } : q)))

    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[questionId]
        return newErrors
      })
    }
  }

  const handleEdit = (questionId: string | number) => {
    setQuestions((prev) => prev.map((q) => (q.id === questionId ? { ...q, isEditing: true } : q)))
  }

  const handleDelete = async (questionId: string | number) => {
    try {
      if (typeof questionId === 'number') {
        await deleteQuestion(questionId, exam_id.toString())
        setRefresh()
      }
      setQuestions((prev) => prev.filter((q) => q.id !== questionId))
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[questionId]
        return newErrors
      })
    } catch (error) {
      console.error('Error deleting question:', error)
    }
  }

  const handleSave = async (question: QuestionState) => {
    const validationErrors = validateQuestion(question)
    if (Object.keys(validationErrors).length > 0) {
      setErrors((prev) => ({
        ...prev,
        [question.id]: validationErrors
      }))
      return
    }

    try {
      const questionData = transformQuestionForAPI(question)
      const payload = {
        ...questionData,
        exam_id
      }

      if (typeof question.id === 'number') {
        await editQuestion(question.id, exam_id, payload as EditQuestionBody)
      } else {
        await createQuestion([payload] as CreateQuestionBody[])
      }

      setRefresh()
      setQuestions((prev) => prev.map((q) => (q.id === question.id ? { ...q, isEditing: false } : q)))
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[question.id]
        return newErrors
      })
    } catch (error) {
      console.error('Error saving question:', error)
    }
  }

  return (
    <div className='w-full mx-auto'>
      <ScrollArea
        ref={scrollAreaRef}
        className='container flex flex-col gap-2 items-start justify-center mx-auto w-full h-[calc(100vh-200px)] py-3'
      >
        <div className='min-h-full relative'>
          {questions.map((question, index) => (
            <QuestionItem
              key={question.id}
              question={question}
              questionNumber={index + 1}
              onDelete={handleDelete}
              onSave={handleSave}
              onEdit={handleEdit}
              onQuestionChange={handleQuestionChange}
              errors={errors[question.id] || {}}
            />
          ))}

          <div className='sticky bottom-0 w-full bg-white py-4'>
            <div className='w-full flex justify-center gap-4'>
              <Button onClick={handleAddQuestion} className='gap-2 border border-gray-500' size='lg' variant='outline'>
                <Plus className='w-4 h-4' />
                Add question
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default CreateExam
