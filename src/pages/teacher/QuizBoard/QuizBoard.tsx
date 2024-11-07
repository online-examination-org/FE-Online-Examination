import { DocumentIcon } from '@/assets/logo'
import { useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CreateExam from './components/CreateExam'
import StudentRecordTable from './components/StudentRecordTable'
import { useSelector } from 'react-redux'
import ExamDetails from './components/ExamDetails'
import { getExamResults } from '@/services/examResults.services'
import { useEffect, useState } from 'react'

const QuizBoard: React.FC = () => {
  const user = useSelector((state: any) => state.user)
  const { id } = useParams()
  const [results, setResults] = useState([])
  console.log(id, user)
  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (id) {
          const response = await getExamResults(id)
          setResults(response.data || [])
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchResults()
  }, [id])
  return (
    <div className='bg-primary-foreground h-[calc(100vh-56px)] overflow-hidden'>
      <div className='w-[1140px] mx-auto py-6 px-2'>
        <div className='flex items-center gap-[24px]'>
          <DocumentIcon />
          <h2 className='text-2xl font-bold'>Quiz 1 - Software engineering (CO3005)</h2>
        </div>
        <Tabs defaultValue='general' className='w-full mx-auto mt-4'>
          <TabsList className='grid w-full grid-cols-3 h-[50px] mb-5 border'>
            <TabsTrigger value='general' className='h-[40px]'>
              General
            </TabsTrigger>
            <TabsTrigger value='result' className='h-[40px]'>
              Results
            </TabsTrigger>
            <TabsTrigger value='question' className='h-[40px]'>
              Questions
            </TabsTrigger>
          </TabsList>

          <TabsContent value='general'>
            <ExamDetails />
          </TabsContent>
          <TabsContent value='result'>
            <StudentRecordTable results={results} />
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
