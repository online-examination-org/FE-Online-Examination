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
    <Card className='relative overflow-hidden bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105 rounded-lg'>
      {/* Background Image with Gradient Overlay */}
      <div
        className='h-[82px] w-full bg-cover bg-center relative'
        style={{
          backgroundImage:
            "url('https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/172740/Originals/background-la-gi-1.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-70'></div>
      </div>

      {/* Card Header */}
      <CardHeader className='absolute top-14 left-0 right-0 p-3'>
        <CardTitle className='flex justify-center items-center'>
          <div className='bg-white w-full px-3 py-3 rounded shadow-md border border-gray-300 text-center truncate'>
            {exam.title}
          </div>
        </CardTitle>

        {/* Exam Details */}
        <CardDescription>
          <div className='text-sm text-gray-800 mt-2 px-3 flex flex-col gap-1'>
            <p>
              <strong>Start:</strong> {formatDateTime(exam.start_time)}
            </p>
            <p>
              <strong>End:</strong> {formatDateTime(exam.end_time)}
            </p>
            <p>
              <strong>Duration:</strong> {exam.duration} minutes
            </p>
          </div>
        </CardDescription>
      </CardHeader>

      {/* Card Footer */}
      <CardFooter className='mt-32 px-3 w-full flex items-center justify-between'>
        <Link to={`/quiz/${exam.exam_id}`} className='w-4/5'>
          <Button className='w-full bg-violet-950 hover:bg-violet-800 text-white font-semibold transition-all duration-200'>
            View detail
          </Button>
        </Link>
        <button
          className='w-1/5 cursor-pointer text-muted-foreground hover:text-red-600 bg-white rounded-sm flex items-center justify-center transition-all duration-200'
          aria-label='Delete Exam'
          title='Delete Exam'
        >
          <Trash className='text-violet-950 hover:text-violet-800' />
        </button>
      </CardFooter>
    </Card>
  )
}

export default ExamCard
