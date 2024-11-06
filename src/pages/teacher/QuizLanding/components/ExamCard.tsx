import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import { Trash } from 'lucide-react'
import { Exam } from '@/types/type'
import { formatDateTime } from '@/utils/date'

interface ExamCardProps {
  exam: Exam
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  return (
    <Card className='relative p-0 overflow-hidden bg-gray-100 hover:scale-105 hover:border-blue-200'>
      {/* Background Image */}
      <div
        className='h-[70px] w-full bg-cover bg-center'
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1678567671496-aa666d40af88?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: 'cover',
          backgroundRepeat: 'false'
        }}
      />

      {/* Card Header */}
      <CardHeader className='absolute top-9 p-3'>
        <CardTitle className='flex justify-between items-center'>
          <div className='bg-white w-4/5 p-1 rounded-sm shadow-sm'>{exam.title}</div>
          <div className='cursor-pointer text-muted-foreground hover:text-primary'>
            <Trash className='text-black' />
          </div>
        </CardTitle>

        {/* Exam Name and Additional Information */}
        <CardDescription>
          <div className='text-black font-semibold'>{exam.description}</div>
          <div className='text-xs text-black mt-2'>
            <p>Start: {formatDateTime(exam.start_time)}</p>
            <p>End: {formatDateTime(exam.end_time)}</p>
            <p>Duration: {exam.duration} minutes</p>
          </div>
        </CardDescription>
      </CardHeader>

      {/* Card Footer */}
      <CardFooter className='mt-32'>
        <Link to={`/quiz/${exam.exam_id}`} className='w-full'>
          <Button className='w-full'>View detail</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default ExamCard
