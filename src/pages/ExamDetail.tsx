import { DocumentIcon } from '@/assets/logo'
import { useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import CreateExam from './CreateExam'
const ExamDetail: React.FC = () => {
  const { id } = useParams()
  console.log(id)
  return (
    <div className='bg-primary-foreground h-[calc(100vh-56px)] overflow-hidden'>
      <div className='w-[1140px] mx-auto py-6 px-2'>
        <div className='flex items-center gap-[24px]'>
          <DocumentIcon />
          <h2 className='text-2xl font-bold'>Quiz 1 - Software engineering (CO3005)</h2>
        </div>
        <Tabs defaultValue='question' className='w-full mx-auto mt-4'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='question'>Questions</TabsTrigger>
            <TabsTrigger value='result'>Results</TabsTrigger>
          </TabsList>
          <TabsContent value='question'>
            <CreateExam />
          </TabsContent>
          <TabsContent value='result'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>Student ID</TableHead>
                  <TableHead>Student name</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Completion time</TableHead>
                  <TableHead>Submitted at</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className='font-medium'>2113619</TableCell>
                  <TableCell>Truong Thuan Hung</TableCell>
                  <TableCell>9</TableCell>
                  <TableCell>12m23s</TableCell>
                  <TableCell>Oct 27, 2024, 2:30 PM</TableCell>
                  <TableCell className='flex gap-[16px]'>
                    <Button>View detail</Button>
                    <Button variant='destructive'>Remove</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>2113619</TableCell>
                  <TableCell>Truong Thuan Hung</TableCell>
                  <TableCell>9</TableCell>
                  <TableCell>12m23s</TableCell>
                  <TableCell>Oct 27, 2024, 2:30 PM</TableCell>
                  <TableCell className='flex gap-[16px]'>
                    <Button>View detail</Button>
                    <Button variant='destructive'>Remove</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ExamDetail
