import ExamCard from '@/components/common/ExamCard'
import { ScrollArea } from '@/components/ui/scroll-area'

function ExamList() {
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
        <ScrollArea className='px-4 py-4 h-[calc(100vh-130px)]'>
          <div className='grid grid-cols-4 gap-4'>
            {exams.map((exam) => (
              <ExamCard exam={exam} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default ExamList
