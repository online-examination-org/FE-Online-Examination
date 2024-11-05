import React from 'react'
import { useForm } from 'react-hook-form'
import ExamCard from '@/pages/teacher/QuizLanding/components/ExamCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

function QuizLanding() {
  const [open, setOpen] = useState(false)

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

  const exams = [
    {
      _id: 1,
      name: 'Quiz 1',
      subject: 'Advanced software engineering'
    },
    {
      _id: 2,
      name: 'Quiz 2',
      subject: 'Advanced software engineering'
    },
    {
      _id: 3,
      name: 'Quiz 3',
      subject: 'Advanced software engineering'
    },
    {
      _id: 4,
      name: 'Quiz 4',
      subject: 'Advanced software engineering'
    },
    {
      _id: 5,
      name: 'Quiz 5',
      subject: 'Advanced software engineering'
    },
    {
      _id: 6,
      name: 'Quiz 6',
      subject: 'Advanced software engineering'
    },
    {
      _id: 7,
      name: 'Quiz 7',
      subject: 'Advanced software engineering'
    },
    {
      _id: 8,
      name: 'Quiz 8',
      subject: 'Advanced software engineering'
    },
    {
      _id: 9,
      name: 'Quiz 9',
      subject: 'Advanced software engineering'
    }
  ]

  return (
    <div className='bg-primary-foreground h-[calc(100vh-56px)] overflow-hidden'>
      <div className='w-[1140px] mx-auto py-6 px-2'>
        <h2 className='text-2xl font-bold'>My examinations</h2>
        <ScrollArea className='py-4 h-[calc(100vh-130px)]'>
          <div className='grid grid-cols-4 gap-4'>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Card className='cursor-pointer'>
                  <CardHeader>
                    <Button variant='secondary' className='w-14 h-14 mx-auto'>
                      <PlusIcon />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className='text-center font-semibold'>Create a new test</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
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
                    <Button type='submit'>Save changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            {exams.map((exam) => (
              <ExamCard key={exam._id} exam={exam} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default QuizLanding
