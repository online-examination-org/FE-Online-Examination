import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import { Trash } from 'lucide-react'

interface Exam {
  _id: string | number
  subject: string
  name: string
  startTime: string
  endTime: string
  studentCount: number
}

interface ExamCardProps {
  exam: Exam
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  return (
    <Card className='relative p-0 overflow-hidden bg-gray-100 hover:scale-105 hover:border-blue-200'>
      {/* Background Image */}
      <div
        className='h-[82px] w-full bg-cover bg-center'
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1678567671496-aa666d40af88?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: 'cover',
          backgroundRepeat: 'false'
        }}
      />

      {/* Card Header */}
      <CardHeader className='absolute top-14 left-0 right-0 p-3'>
        <CardTitle className='flex justify-center items-center'>
          <div className='bg-white w-full px-1 py-2 rounded-sm shadow-sm truncate'>{exam.subject}</div>
        </CardTitle>

        {/* Exam Name and Additional Information */}
        <CardDescription>
          <div className='text-xs text-black mt-2'>
            <p>Start: {exam.startTime}</p>
            <p>End: {exam.endTime}</p>
            <p>Students Completed: {exam.studentCount}</p>
          </div>
        </CardDescription>
      </CardHeader>

      {/* Card Footer */}
      <CardFooter className='mt-24 px-3 w-full flex items-center justify-between'>
        <Link to={`/quiz/${exam._id}`} className='w-4/5'>
          <Button className='w-full'>View detail</Button>
        </Link>
        <div className='w-1/5 cursor-pointer text-muted-foreground hover:text-primary bg-white rounded-sm flex items-center justify-center'>
          <Trash className='text-black' />
        </div>
      </CardFooter>
    </Card>
  )
}

export default ExamCard
