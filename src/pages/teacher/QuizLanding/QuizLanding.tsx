import React from 'react'
import { useForm } from 'react-hook-form'
import ExamCard from '@/pages/teacher/QuizLanding/components/ExamCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState, useEffect } from 'react'
import { Exam } from '@/types/type'

function QuizLanding() {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [startDateFilter, setStartDateFilter] = useState('')
  const [endDateFilter, setEndDateFilter] = useState('')
  const [examsDisplay, setExamsDisplay] = useState<Exam[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      title: '',
      startTime: new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16),
      endTime: new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16),
      duration: 30,
      description: ''
    }
  })

  const onSubmit = (data) => {
    console.log(data)
    setOpen(false)
    reset()
  }

  const exams: Exam[] = [
    {
      exam_id: 1,
      teacher_id: 101,
      title: 'Math Midterm',
      passcode: 'MATH123',
      start_time: '2024-11-10T09:00:00',
      end_time: '2024-11-10T10:30:00',
      duration: 90,
      create_at: 1730217000,
      description: 'Midterm exam covering algebra and calculus.'
    },
    {
      exam_id: 2,
      teacher_id: 123,
      title: 'Test',
      passcode: '123A123',
      start_time: '2024-10-30T11:30:15',
      end_time: '2024-10-30T11:45:15',
      duration: 15,
      create_at: 1730217888,
      description: 'final'
    },
    {
      exam_id: 3,
      teacher_id: 102,
      title: 'Physics Final',
      passcode: 'PHY321',
      start_time: '2024-12-15T13:00:00',
      end_time: '2024-12-15T15:00:00',
      duration: 120,
      create_at: 1730219000,
      description: 'Comprehensive final covering entire syllabus.'
    }
  ]

  useEffect(() => {
    let filteredExams = [...exams]

    // Search filter
    if (searchTerm) {
      filteredExams = filteredExams.filter((exam) => exam.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Date range filter
    if (startDateFilter) {
      filteredExams = filteredExams.filter((exam) => new Date(exam.start_time) >= new Date(startDateFilter))
    }

    if (endDateFilter) {
      filteredExams = filteredExams.filter((exam) => new Date(exam.end_time) <= new Date(endDateFilter))
    }

    setExamsDisplay(filteredExams)
  }, [searchTerm, startDateFilter, endDateFilter, exams])

  return (
    <div className='bg-primary-foreground h-[calc(100vh-56px)] overflow-hidden'>
      <div className='w-[1140px] mx-auto py-6 px-2'>
        <div className='flex flex-col justify-between mb-4 gap-4'>
          <h2 className='text-2xl font-bold'>My examinations</h2>
          <div className='flex gap-4'>
            <div className='flex gap-2'>
              <Input
                type='text'
                placeholder='Search by title...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-64'
              />
            </div>
            <div className='flex gap-2 items-center'>
              <Input
                type='datetime-local'
                value={startDateFilter}
                onChange={(e) => setStartDateFilter(e.target.value)}
                className='w-48 block'
              />
              <span>to</span>
              <Input
                type='datetime-local'
                value={endDateFilter}
                onChange={(e) => setEndDateFilter(e.target.value)}
                className='w-48 block'
              />
            </div>
          </div>
        </div>

        <ScrollArea className='py-4 h-[calc(100vh-130px)]'>
          <div className='grid grid-cols-4 gap-4 p-3'>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Card className='min-h-[271px] relative overflow-hidden bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105 rounded-lg'>
                  <div
                    className='h-[82px] w-full bg-cover bg-center relative'
                    style={{
                      backgroundImage:
                        "url('https://plus.unsplash.com/premium_photo-1678567671496-aa666d40af88?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-70'></div>
                  </div>
                  <CardHeader className='absolute top-14 left-0 right-0 p-3'>
                    <CardTitle className='flex justify-center items-center'>
                      <div className='bg-white w-full px-3 py-3 rounded shadow-md border border-gray-300 text-center truncate'>
                        Create an examination
                      </div>
                    </CardTitle>

                    <CardDescription>
                      <div className='flex w-1/4 h-1/4 mx-auto overflow-hidden pt-5'>
                        <img
                          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCfmyy5-Ewc_F7rubOKTMcl8gCxii3Cnk2UA&s'
                          alt=''
                          className='w-full h-full object-cover'
                        />
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[555px]'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <DialogHeader>
                    <DialogTitle>Create a new exam</DialogTitle>
                  </DialogHeader>
                  <div className='grid gap-4 py-4 p-3'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='title' className='text-right'>
                        Title
                      </Label>
                      <div className='col-span-3'>
                        <Input
                          {...register('title', {
                            required: 'Title is required',
                            minLength: {
                              value: 3,
                              message: 'Title must be at least 3 characters'
                            }
                          })}
                        />
                        {errors.title && <p className='text-sm text-red-500 mt-1'>{errors.title.message}</p>}
                      </div>
                    </div>

                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='startTime' className='text-right'>
                        Start Time
                      </Label>
                      <div className='col-span-3'>
                        <Input
                          type='datetime-local'
                          {...register('startTime', {
                            required: 'Start time is required'
                          })}
                        />
                        {errors.startTime && <p className='text-sm text-red-500 mt-1'>{errors.startTime.message}</p>}
                      </div>
                    </div>

                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='endTime' className='text-right'>
                        End Time
                      </Label>
                      <div className='col-span-3'>
                        <Input
                          type='datetime-local'
                          {...register('endTime', {
                            required: 'End time is required',
                            validate: (value, formValues) =>
                              new Date(value) > new Date(formValues.startTime) || 'End time must be after start time'
                          })}
                        />
                        {errors.endTime && <p className='text-sm text-red-500 mt-1'>{errors.endTime.message}</p>}
                      </div>
                    </div>

                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='duration' className='text-right'>
                        Duration (minutes)
                      </Label>
                      <div className='col-span-3'>
                        <Input
                          type='number'
                          {...register('duration', {
                            required: 'Duration is required',
                            min: {
                              value: 1,
                              message: 'Duration must be at least 1 minute'
                            },
                            max: {
                              value: 180,
                              message: 'Duration cannot exceed 180 minutes'
                            }
                          })}
                        />
                        {errors.duration && <p className='text-sm text-red-500 mt-1'>{errors.duration.message}</p>}
                      </div>
                    </div>

                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='description' className='text-right'>
                        Description
                      </Label>
                      <div className='col-span-3'>
                        <Textarea
                          {...register('description', {
                            required: 'Description is required',
                            minLength: {
                              value: 10,
                              message: 'Description must be at least 10 characters'
                            }
                          })}
                        />
                        {errors.description && (
                          <p className='text-sm text-red-500 mt-1'>{errors.description.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type='submit'>Create</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            {examsDisplay.map((exam) => (
              <ExamCard key={exam.exam_id} exam={exam} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default QuizLanding
