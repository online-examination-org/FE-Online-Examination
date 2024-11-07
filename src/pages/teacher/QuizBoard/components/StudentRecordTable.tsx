import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { User, Clock, Calendar, Award, LayoutGrid, List } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ExamResult } from '@/types/type'

interface StudentRecord {
  id: string
  name: string
  score: number
  completionTime: string
  submittedAt: string
}

interface StudentRecordTableProps {
  results: ExamResult[]
}
const StudentRecordDisplay: React.FC<StudentRecordTableProps> = ({ results }) => {
  const navigate = useNavigate()
  const [viewType, setViewType] = useState<'grid' | 'list'>('list')

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800'
    if (score >= 70) return 'bg-blue-100 text-blue-800'
    return 'bg-red-100 text-red-800'
  }

  const CardView = () => (
    <div className='grid gap-4 md:grid-cols-4'>
      {results.map((result) => (
        <Card key={result.examResultId} className='hover:shadow-lg transition-shadow'>
          <CardContent className='pt-6'>
            <div className='flex items-start justify-between'>
              <div className='flex items-center w-full space-x-3'>
                <div className='h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center'>
                  <User className='h-6 w-6 text-gray-600' />
                </div>
                <div>
                  <h3 className='font-semibold text-md'>{result.name}</h3>
                  <p className='text-sm text-gray-500'>ID: {result.studentId}</p>
                </div>
              </div>
            </div>

            <div className='mt-4 space-y-2'>
              <div className='flex items-center text-sm text-gray-600'>
                <Clock className='h-4 w-4 mr-2' />
                Completion: {result.finishedAt}
              </div>
              <div className='flex items-center text-sm text-gray-600'>
                <Calendar className='h-4 w-4 mr-2' />
                Submitted: {result.finishedAt}
              </div>
            </div>

            <div className='mt-4 flex justify-between'>
              <Badge className={`${getScoreColor(result.score ? parseInt(result.score) : 0)} text-sm px-3 py-1`}>
                {result.score || 0}%
              </Badge>
              <Button
                variant='outline'
                className='flex items-center gap-2'
                onClick={() => navigate(`/quiz/2/student/${result.studentId}`)}
              >
                <Award className='h-4 w-4' />
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const ListView = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>ID</TableHead>
          <TableHead className='text-center'>Score</TableHead>
          <TableHead>Completion Time</TableHead>
          <TableHead>Submitted At</TableHead>
          <TableHead className='pl-5'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((result) => (
          <TableRow key={result.examResultId} className='h-[50px]'>
            <TableCell className='font-medium'>
              <div className='flex items-center gap-2'>
                <div className='h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center'>
                  <User className='h-4 w-4 text-gray-600' />
                </div>
                {result.name}
              </div>
            </TableCell>
            <TableCell>{result.examResultId}</TableCell>
            <TableCell className='text-center'>
              <Badge className={`${getScoreColor(result.score ? parseInt(result.score) : 0)}`}>
                {result.score || 0}%
              </Badge>
            </TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <Clock className='h-4 w-4 text-gray-500' />
                {result.finishedAt}
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <Calendar className='h-4 w-4 text-gray-500' />
                {result.finishedAt}
              </div>
            </TableCell>
            <TableCell className='text-right'>
              <Button
                variant='outline'
                size='sm'
                className='flex items-center gap-2'
                onClick={() => navigate(`/quiz/2/student/${student.id}`)}
              >
                <Award className='h-4 w-4' />
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className='w-full mx-auto space-y-4 py-4'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>Student Quiz Results</h2>
        <ToggleGroup
          type='single'
          value={viewType}
          onValueChange={(value: 'grid' | 'list') => value && setViewType(value)}
        >
          <ToggleGroupItem value='list' aria-label='List view'>
            <List className='h-4 w-4' />
          </ToggleGroupItem>
          <ToggleGroupItem value='grid' aria-label='Grid view'>
            <LayoutGrid className='h-4 w-4' />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {viewType === 'grid' ? <CardView /> : <ListView />}
    </div>
  )
}

export default StudentRecordDisplay
