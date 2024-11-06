import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Pencil, Plus, Save, GripVertical } from 'lucide-react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'

const SortableQuestion = ({ question, originalQuestion, questionErrors, questionNumber, ...props }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: question.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div className='w-full mb-7 px-3' ref={setNodeRef} style={style}>
      <Card className='w-full rounded-lg'>
        <CardHeader>
          <div className='flex items-center justify-between gap-6'>
            <div className='flex items-center gap-4 flex-1'>
              <div {...attributes} {...listeners} className='cursor-grab active:cursor-grabbing'>
                <GripVertical className='w-5 h-5 text-gray-400' />
              </div>

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
              <Button variant='destructive' onClick={() => props.onDelete(props.questionIndex)}>
                Delete
              </Button>
              <Button onClick={() => props.onToggleEdit(question)}>Save</Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

const CreateExam = () => {
  const initialQuestion = {
    questionText: 'New question',
    questionType: 'multipleChoice',
    choices: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    answer: '',
    shortAnswer: '',
    isEditing: true
  }

  const [quizConfig, setQuizConfig] = useState({
    title: 'Quiz 01',
    passcode: '',
    startTime: new Date(new Date().getTime() + 7 * 60 * 60 * 1000),
    endTime: new Date(new Date().getTime() + 7 * 60 * 60 * 1000),
    duration: 30,
    description: 'This is quiz description'
  })

  const [quizConfigDisplay, setQuizConfigDisplay] = useState({
    title: 'Quiz 01',
    passcode: '',
    startTime: new Date(new Date().getTime() + 7 * 60 * 60 * 1000),
    endTime: new Date(new Date().getTime() + 7 * 60 * 60 * 1000),
    duration: 30,
    description: 'This is quiz description'
  })

  const [questions, setQuestions] = useState([])
  const [editingStates, setEditingStates] = useState({})
  const [errors, setErrors] = useState({})
  const addButtonRef = useRef(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

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
    // setTimeout(() => {
    //   addButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // }, 0)
  }

  useEffect(() => {
    if (questions.length === 0) handleAddQuestion()
  }, [])

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
      answer: q.questionType === 'multipleChoice' ? q.choices[parseInt(q.answer)] : q.shortAnswer
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
    <div className='w-full mx-auto'>
      {/* <div className='container items-center justify-start mx-auto w-full'>
        <Card className='w-full'>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <div>
                <CardTitle className='text-3xl'>{quizConfig.title}</CardTitle>
                <CardDescription className='mt-2'>{quizConfig.description}</CardDescription>
              </div>

              <Dialog
                onOpenChange={(e) => {
                  if (e) {
                    setQuizConfigDisplay(quizConfig)
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button variant='outline' size='icon'>
                    <Pencil className='h-4 w-4' />
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Quiz Configuration</DialogTitle>
                  </DialogHeader>
                  <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='title' className='text-right'>
                        Title
                      </Label>
                      <Input
                        id='title'
                        className='col-span-3'
                        value={quizConfigDisplay.title}
                        onChange={(e) => setQuizConfigDisplay({ ...quizConfigDisplay, title: e.target.value })}
                      />
                    </div>

                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='passcode' className='text-right'>
                        Passcode
                      </Label>
                      <Input
                        id='passcode'
                        type='password'
                        className='col-span-3'
                        value={quizConfigDisplay.passcode}
                        onChange={(e) => setQuizConfigDisplay({ ...quizConfigDisplay, passcode: e.target.value })}
                      />
                    </div>

                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='start' className='text-right'>
                        Start Time
                      </Label>
                      <Input
                        id='start'
                        type='datetime-local'
                        className='col-span-3'
                        value={quizConfigDisplay.startTime.toISOString().slice(0, 16)}
                        onChange={(e) =>
                          setQuizConfigDisplay({
                            ...quizConfigDisplay,
                            startTime: new Date(e.target.value)
                          })
                        }
                      />
                    </div>

                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='end' className='text-right'>
                        End Time
                      </Label>
                      <Input
                        id='end'
                        type='datetime-local'
                        className='col-span-3'
                        value={quizConfigDisplay.endTime.toISOString().slice(0, 16)}
                        onChange={(e) =>
                          setQuizConfigDisplay({
                            ...quizConfigDisplay,
                            endTime: new Date(e.target.value)
                          })
                        }
                      />
                    </div>

                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='duration' className='text-right'>
                        Duration (minutes)
                      </Label>
                      <Input
                        id='duration'
                        type='number'
                        className='col-span-3'
                        value={quizConfigDisplay.duration}
                        onChange={(e) => {
                          setQuizConfigDisplay({
                            ...quizConfigDisplay,
                            duration: parseInt(e.target.value)
                          })
                        }}
                      />
                    </div>

                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='description' className='text-right'>
                        Description
                      </Label>
                      <Textarea
                        id='description'
                        className='col-span-3'
                        value={quizConfigDisplay.description}
                        onChange={(e) => setQuizConfigDisplay({ ...quizConfigDisplay, description: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        type='button'
                        onClick={() => {
                          setQuizConfig({
                            ...quizConfigDisplay,
                            title: quizConfigDisplay.title.trim(),
                            description: quizConfigDisplay.description.trim()
                          })
                        }}
                      >
                        Save changes
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
        </Card>
      </div> */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <ScrollArea className='container flex flex-col gap-2 items-start justify-center mx-auto w-full h-[80vh] py-3'>
          <SortableContext items={questions.map((q) => q.id)} strategy={verticalListSortingStrategy}>
            {questions.map((originalQuestion, index) => {
              const question = getQuestionDisplayData(originalQuestion)
              const questionErrors = errors[question.id] || {}

              return (
                <SortableQuestion
                  key={question.id}
                  question={question}
                  originalQuestion={originalQuestion}
                  questionErrors={questionErrors}
                  questionIndex={index}
                  questionNumber={index + 1}
                  onQuestionChange={handleQuestionChange}
                  onToggleEdit={toggleEditMode}
                  onDelete={handleDeleteQuestion}
                />
              )
            })}
          </SortableContext>

          <div className='w-full flex justify-center gap-4 py-4 mb-4' ref={addButtonRef}>
            <Button onClick={handleAddQuestion} className='gap-2' size='lg'>
              <Plus className='w-4 h-4' />
              Add question
            </Button>
            <Button onClick={handleCreateExam} className='gap-2' size='lg' variant='secondary'>
              <Save className='w-4 h-4' />
              Create exam
            </Button>
          </div>
        </ScrollArea>
      </DndContext>
    </div>
  )
}

export default CreateExam
