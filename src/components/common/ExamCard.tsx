import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrashIcon } from '@/assets/logo'
import React from 'react'
import { Link } from 'react-router-dom'
interface Exam {
  _id: string | number
  subject: string
  name: string
}

interface ExamCardProps {
  exam: Exam
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex justify-between items-center'>
          {exam.subject}
          <div className='cursor-pointer text-muted-foreground hover:text-primary'>
            <TrashIcon />
          </div>
        </CardTitle>
        <CardDescription>{exam.name}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link to={`/exam/${exam._id}`} className='w-full'>
          <Button className='w-full'>View detail</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default ExamCard
