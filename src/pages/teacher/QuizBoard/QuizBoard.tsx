/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentIcon } from '@/assets/logo'
import { useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CreateExam from './components/CreateExam'
import StudentRecordTable from './components/StudentRecordTable'
import ExamDetails from './components/ExamDetails'
import { getExamResults } from '@/services/examResults.services'
import { useEffect, useState } from 'react'
import { Exam, Question } from '@/types/type'
import { getExams } from '@/services/teachers.services'
import { getQuestions } from '@/services/questions.services'

const QuizBoard: React.FC = () => {
  const { id } = useParams()
  const [results, setResults] = useState([])

  const [exam, setExam] = useState<Exam | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [refresh, setRefesh] = useState(true)

  const fetchExam = async () => {
    try {
      const response = await getExams()
      console.log(response.data)
      setExam(response.data.find((exam) => exam.examId === parseInt(id as string)) || null)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchResults = async () => {
    try {
      const response = await getExamResults(id as string)
      console.log(response.data)
      setResults(response.data || [])
    } catch (err) {
      console.log(err)
    }
  }

  const fetchQuestions = async () => {
    try {
      const response = await getQuestions(id as string)
      const mappedQuestions: Question[] = response.data.map((item: any) => ({
        questionId: item.questionId,
        examId: item.exam.examId,
        questionText: item.questionText,
        questionType: item.questionType,
        answer: item.answer,
        choices: item.choices || {}
      }))
      setQuestions(mappedQuestions)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (id) {
      fetchExam()
      fetchResults()
    }
  }, [id])

  useEffect(() => {
    if (id) {
      fetchExam()
      fetchQuestions()
    }
  }, [id, refresh])

  return (
    <div className='bg-primary-foreground h-[calc(100vh-56px)] overflow-hidden'>
      <div className='w-[1140px] mx-auto py-6 px-2'>
        <div className='flex items-center gap-[24px]'>
          <DocumentIcon />
          <h2 className='text-2xl font-bold'>{exam?.title || 'Exam title'}</h2>
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
            <ExamDetails exam={exam} setRefesh={() => setRefesh((prev) => !prev)} />
          </TabsContent>
          <TabsContent value='result'>
            <StudentRecordTable results={results} examId={id} />
          </TabsContent>
          <TabsContent value='question'>
            <CreateExam questions={questions} setRefresh={() => setRefesh(!refresh)} exam_id={id as string} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default QuizBoard
