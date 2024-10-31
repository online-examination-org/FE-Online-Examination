import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Pencil, Plus, Save } from 'lucide-react'

const CreateExam = () => {
  const initialQuestion = {
    questionText: 'New question',
    questionType: 'multipleChoice',
    choices: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    answer: '', // Change to store index instead of value
    shortAnswer: '',
    isEditing: true
  }

  const [questions, setQuestions] = useState([])
  const [editingStates, setEditingStates] = useState({})
  const [errors, setErrors] = useState({})
  const addButtonRef = useRef(null)

  const handleAddQuestion = () => {
    const newQuestion = { ...initialQuestion, id: Date.now() }
    setQuestions([...questions, newQuestion])
    setEditingStates((prev) => ({
      ...prev,
      [newQuestion.id]: {
        ...newQuestion,
        isEditing: true
      }
    }))
    setTimeout(() => {
      addButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 0)
  }

  const handleCreateExam = () => {
    if (questions.length === 0) {
      alert('Please add at least one question before creating the exam')
      return
    }

    const hasUnsavedQuestions = questions.some((q) => editingStates[q.id]?.isEditing)

    if (hasUnsavedQuestions) {
      alert('Please save all questions before creating the exam')
      return
    }

    const finalQuestions = questions.map((q) => ({
      id: q.id,
      questionText: q.questionText,
      questionType: q.questionType,
      choices: q.questionType === 'multipleChoice' ? q.choices : [],
      answer: q.questionType === 'multipleChoice' ? q.choices[parseInt(q.answer)] : q.shortAnswer // Get actual answer value from choices array
    }))

    console.log('Exam Questions:', finalQuestions)
    alert('Exam created successfully')
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

  const validateQuestion = (question) => {
    const newErrors = {}

    if (!question.questionText.trim()) {
      newErrors.questionText = 'Question text is required'
    }

    if (question.questionType === 'multipleChoice') {
      if (question.answer === '') {
        // Check if answer index is empty
        newErrors.answer = 'Please select an answer'
      }
      if (question.choices.some((choice) => !choice.trim())) {
        newErrors.choices = 'Options cannot be empty'
      }
    }

    if (question.questionType === 'shortQuestion') {
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
    <div className='min-h-[calc(100vh-56px)]'>
      <div className='container items-start justify-center mx-auto p-6 max-w-3xl'>
        <Card className='w-full'>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <div>
                <CardTitle className='text-3xl'>Quiz 01</CardTitle>
                <CardDescription className='mt-2'>This is quiz description</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className='container flex flex-col gap-4 items-start justify-center mx-auto p-6 max-w-3xl'>
        {questions.map((originalQuestion) => {
          const question = getQuestionDisplayData(originalQuestion)
          const questionErrors = errors[question.id] || {}

          return (
            <Card className='w-full' key={question.id}>
              <CardHeader>
                <div className='flex items-center justify-between gap-6'>
                  {question.isEditing ? (
                    <>
                      <Input
                        value={question.questionText}
                        onChange={(e) => handleQuestionChange(question.id, 'questionText', e.target.value)}
                        className={questionErrors.questionText ? 'border-red-500' : ''}
                      />
                      <Select
                        value={question.questionType}
                        onValueChange={(value) => {
                          handleQuestionChange(question.id, 'questionType', value)
                          handleQuestionChange(question.id, 'answer', '')
                          handleQuestionChange(question.id, 'shortAnswer', '')
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
                      <Button variant='ghost' size='icon' onClick={() => toggleEditMode(question)}>
                        <Pencil className='w-4 h-4' />
                      </Button>
                    </>
                  )}
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
                      value={question.answer} // Now storing index as string
                      onValueChange={(value) => handleQuestionChange(question.id, 'answer', value)}
                    >
                      {question.choices.map((choice, choiceIndex) => (
                        <div className='flex items-center space-x-2' key={choiceIndex}>
                          <RadioGroupItem
                            value={choiceIndex.toString()} // Use index as value
                            disabled={!question.isEditing}
                          />
                          {question.isEditing ? (
                            <Input
                              value={choice}
                              onChange={(e) => {
                                const newChoices = [...question.choices]
                                newChoices[choiceIndex] = e.target.value
                                handleQuestionChange(question.id, 'choices', newChoices)
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
                      onChange={(e) => handleQuestionChange(question.id, 'shortAnswer', e.target.value)}
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
                    <Button
                      variant='destructive'
                      onClick={() => handleDeleteQuestion(questions.indexOf(originalQuestion))}
                    >
                      Delete
                    </Button>
                    <Button onClick={() => toggleEditMode(question)}>Save</Button>
                  </div>
                </CardFooter>
              )}
            </Card>
          )
        })}

        <div className='w-full flex justify-center gap-4 py-8' ref={addButtonRef}>
          <Button onClick={handleAddQuestion} className='gap-2' size='lg'>
            <Plus className='w-4 h-4' />
            Add question
          </Button>
          <Button onClick={handleCreateExam} className='gap-2' size='lg' variant='secondary'>
            <Save className='w-4 h-4' />
            Create exam
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateExam
