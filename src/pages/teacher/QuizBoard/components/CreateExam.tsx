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

const transformQuestionForAPI = (question) => {
  const baseData = {
    questionId: question.id,
    questionText: question.questionText,
    questionType: question.questionType
  }

  if (question.questionType === 'multipleChoice') {
    const choices = {}
    question.choices.forEach((choice, index) => {
      choices[index] = choice
    })

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

const QuestionItem = ({ question, originalQuestion, questionErrors, questionNumber, exam_id, ...props }) => {
  const [isVisible, setIsVisible] = useState(true)

  const validateBeforeSave = (question) => {
    const errors = {}

    if (!question.questionText.trim()) {
      errors.questionText = 'Question text is required'
    }

    if (question.questionType === 'multipleChoice') {
      if (question.answer === '') {
        errors.answer = 'Please select an answer'
        return errors
      }
      if (question.choices.some((choice) => !choice.trim())) {
        errors.choices = 'All options must be filled'
      }
    } else if (question.questionType === 'shortQuestion') {
      if (!question.shortAnswer?.trim()) {
        errors.shortAnswer = 'Answer is required'
      }
    }

    return errors
  }

  const handleDelete = async () => {
    try {
      if (originalQuestion.id && originalQuestion.id !== 'new') {
        await deleteQuestion(originalQuestion.id, exam_id.toString())
        setIsVisible(false)
        props.setRefresh()
      } else {
        props.onDelete(props.questionIndex)
      }
    } catch (error) {
      console.error('Error deleting question:', error)
    }
  }

  const handleSave = async () => {
    try {
      const validationErrors = validateBeforeSave(question)
      if (Object.keys(validationErrors).length > 0) {
        props.onValidationErrors(question.id, validationErrors)
        return
      }

      const questionData = transformQuestionForAPI(question)

      const isExistingQuestion = originalQuestion.id && originalQuestion.id !== 'new'

      if (isExistingQuestion) {
        let payload
        if (questionData.questionType === 'multipleChoice') {
          const letters = ['A', 'B', 'C', 'D']
          const newChoices = Object.fromEntries(
            Object.entries(questionData.choices).map(([, value], index) => [letters[index], value])
          )
          payload = {
            ...questionData,
            choices: newChoices,
            exam_id,
            questionId: originalQuestion.id
          }
        } else {
          payload = {
            ...questionData,
            exam_id,
            questionId: originalQuestion.id
          }
        }

        try {
          await editQuestion(originalQuestion.id, exam_id, payload as EditQuestionBody)
          props.setRefresh()
        } catch (err) {
          console.error('Error updating question:', err)
          throw err
        }
      } else {
        let payload
        if (questionData.questionType === 'multipleChoice') {
          const letters = ['A', 'B', 'C', 'D']
          const newChoices = Object.fromEntries(
            Object.entries(questionData.choices).map(([, value], index) => [letters[index], value])
          )
          payload = {
            ...questionData,
            choices: newChoices,
            exam_id
          }
        } else {
          payload = {
            ...questionData,
            exam_id
          }
        }

        try {
          await createQuestion([payload] as CreateQuestionBody[])
          props.setRefresh()
        } catch (err) {
          console.error('Error creating question:', err)
          throw err
        }
      }
      props.onToggleEdit(question)
    } catch (error) {
      console.error('Error saving question:', error)
    }
  }

  if (!isVisible) return null

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
                    onChange={(e) => props.onQuestionChange(question.id, 'questionText', e.target.value)}
                    className={questionErrors.questionText ? 'border-red-500' : ''}
                  />
                  <Select
                    value={question.questionType}
                    onValueChange={(value) => {
                      props.onQuestionChange(question.id, 'questionType', value)
                      props.onQuestionChange(question.id, 'answer', '')
                      props.onQuestionChange(question.id, 'shortAnswer', '')
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
                  <Button variant='ghost' size='icon' onClick={() => props.onToggleEdit(question)}>
                    <Pencil className='w-4 h-4' />
                  </Button>
                </>
              )}
            </div>
          </div>
          {questionErrors.questionText && (
            <div className='text-red-500 text-sm mt-1'>{questionErrors.questionText}</div>
          )}
        </CardHeader>
        <CardContent className='space-y-6'>
          {question.questionType === 'multipleChoice' ? (
            <div className='space-y-4'>
              <RadioGroup
                className='space-y-2'
                value={question.answer}
                onValueChange={(value) => props.onQuestionChange(question.id, 'answer', value)}
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
                          props.onQuestionChange(question.id, 'choices', newChoices)
                        }}
                        className={questionErrors.choices ? 'border-red-500' : ''}
                      />
                    ) : (
                      <div className='px-3 py-2'>{choice}</div>
                    )}
                  </div>
                ))}
              </RadioGroup>
              {questionErrors.answer && <div className='text-red-500 text-sm'>{questionErrors.answer}</div>}
              {questionErrors.choices && <div className='text-red-500 text-sm'>{questionErrors.choices}</div>}
            </div>
          ) : (
            <div>
              <Textarea
                placeholder='Enter the answer'
                value={question.shortAnswer}
                onChange={(e) => props.onQuestionChange(question.id, 'shortAnswer', e.target.value)}
                className={questionErrors.shortAnswer ? 'border-red-500' : ''}
                disabled={!question.isEditing}
              />
              {questionErrors.shortAnswer && (
                <div className='text-red-500 text-sm mt-1'>{questionErrors.shortAnswer}</div>
              )}
            </div>
          )}
        </CardContent>
        {question.isEditing && (
          <CardFooter>
            <div className='flex gap-4 justify-end w-full'>
              <Button variant='outline' className='border border-red-500 text-red-500' onClick={handleDelete}>
                Delete
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

const CreateExam = ({ questions: initialQuestions, exam_id, setRefresh }: CreateExamProps) => {
  const initialQuestion = {
    questionText: 'New question',
    questionType: 'multipleChoice',
    choices: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    answer: '',
    shortAnswer: '',
    isEditing: true
  }

  const transformInitialQuestions = () => {
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

  const [questions, setQuestions] = useState(transformInitialQuestions)
  const [editingStates, setEditingStates] = useState({})
  const [errors, setErrors] = useState({})
  const scrollAreaRef = useRef(null)
  const addButtonRef = useRef(null)

  useEffect(() => {
    if (questions.length === 0) handleAddQuestion()
  }, [])

  const handleAddQuestion = () => {
    const hasUnsavedQuestions = questions.some((q) => editingStates[q.id]?.isEditing)

    if (hasUnsavedQuestions) {
      alert('Please save the current question before adding a new one')
      return
    }

    const newQuestion = { ...initialQuestion, id: 'new' }
    setQuestions([...questions, newQuestion])
    setEditingStates((prev) => ({
      ...prev,
      [newQuestion.id]: {
        ...newQuestion,
        isEditing: true
      }
    }))

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

  const handleDeleteQuestion = (index) => {
    const questionId = questions[index].id
    const newQuestions = questions.filter((_, i) => i !== index)
    setQuestions(newQuestions)
    const newEditingStates = { ...editingStates }
    delete newEditingStates[questionId]
    setEditingStates(newEditingStates)

    const newErrors = { ...errors }
    delete newErrors[questionId]
    setErrors(newErrors)
  }

  const handleQuestionChange = (questionId, field, value) => {
    setEditingStates((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value
      }
    }))

    if (errors[questionId]) {
      const newErrors = { ...errors }
      delete newErrors[questionId]
      setErrors(newErrors)
    }
  }

  const handleValidationErrors = (questionId, validationErrors) => {
    setErrors((prev) => ({
      ...prev,
      [questionId]: validationErrors
    }))
  }

  const validateQuestion = (question) => {
    const newErrors = {}

    if (!question.questionText.trim()) {
      newErrors.questionText = 'Question text is required'
    }

    if (question.questionType === 'multipleChoice') {
      if (question.answer === '') {
        newErrors.answer = 'Please select an answer'
        return newErrors
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

  const toggleEditMode = (question) => {
    const questionId = question.id
    if (!editingStates[questionId]?.isEditing) {
      setEditingStates((prev) => ({
        ...prev,
        [questionId]: {
          ...question,
          isEditing: true
        }
      }))
    } else {
      const currentQuestion = editingStates[questionId]
      const validationErrors = validateQuestion(currentQuestion)

      if (Object.keys(validationErrors).length > 0) {
        setErrors({
          ...errors,
          [questionId]: validationErrors
        })
        return
      }

      setQuestions(
        questions.map((q) => {
          if (q.id === questionId) {
            return {
              ...editingStates[questionId],
              isEditing: false
            }
          }
          return q
        })
      )
      const newEditingStates = { ...editingStates }
      delete newEditingStates[questionId]
      setEditingStates(newEditingStates)

      const newErrors = { ...errors }
      delete newErrors[questionId]
      setErrors(newErrors)
    }
  }

  const getQuestionDisplayData = (question) => {
    return editingStates[question.id]?.isEditing ? editingStates[question.id] : question
  }

  return (
    <div className='w-full mx-auto'>
      <ScrollArea
        ref={scrollAreaRef}
        className='container flex flex-col gap-2 items-start justify-center mx-auto w-full h-[calc(100vh-200px)] py-3'
      >
        <div className='min-h-full relative'>
          {questions.map((originalQuestion, index) => {
            const question = getQuestionDisplayData(originalQuestion)
            const questionErrors = errors[question.id] || {}

            return (
              <QuestionItem
                key={question.id}
                question={question}
                originalQuestion={originalQuestion}
                questionErrors={questionErrors}
                questionIndex={index}
                questionNumber={index + 1}
                onQuestionChange={handleQuestionChange}
                onToggleEdit={toggleEditMode}
                onDelete={handleDeleteQuestion}
                onValidationErrors={handleValidationErrors}
                setRefresh={setRefresh}
                exam_id={exam_id}
              />
            )
          })}

          <div className='sticky bottom-0 w-full bg-white py-4' ref={addButtonRef}>
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
