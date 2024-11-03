import { DocumentIcon } from '@/assets/logo'
import { useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CreateExam from './components/CreateExam'
import StudentRecordTable from './components/StudentRecordTable'
import { useSelector } from 'react-redux'

const QuizBoard: React.FC = () => {
  const user = useSelector((state: any) => state.user)
  const { id } = useParams()
  console.log(id, user)

  return (
    <div className='bg-primary-foreground h-[calc(100vh-56px)] overflow-hidden'>
      <div className='w-[1140px] mx-auto py-6 px-2'>
        <div className='flex items-center gap-[24px]'>
          <DocumentIcon />
          <h2 className='text-2xl font-bold'>Quiz 1 - Software engineering (CO3005)</h2>
        </div>
        <Tabs defaultValue='result' className='w-full mx-auto mt-4'>
          <TabsList className='grid w-full grid-cols-2 h-[50px] mb-5 border'>
            <TabsTrigger value='result' className='h-[40px]'>
              Results
            </TabsTrigger>
            <TabsTrigger value='question' className='h-[40px]'>
              Questions
            </TabsTrigger>
          </TabsList>

          <TabsContent value='result'>
            <StudentRecordTable />
          </TabsContent>
          <TabsContent value='question'>
            <CreateExam />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default QuizBoard
