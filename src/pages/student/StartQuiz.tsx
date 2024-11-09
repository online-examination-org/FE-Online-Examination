/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { startQuiz } from '@/services/students.services'
import { setQuestions } from '@/store/slices/questionSlice'

export default function StartQuiz() {
  const { examGetResponse } = useSelector((state: any) => state.exam)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleStartQuiz = async () => {
    try {
      const currentTime = new Date()

      const response = await startQuiz({ examId: examGetResponse.examId, startedAt: currentTime.toISOString() })

      if (response) {
        console.log(response)
        dispatch(setQuestions(response))

        localStorage.setItem('start_time', currentTime.toISOString())

        const endTime = new Date(currentTime.getTime() + examGetResponse.duration * 60 * 1000)
        localStorage.setItem('end_time', endTime.toISOString())
      }

      navigate('/do-test')
    } catch (error) {
      console.error(error)
    }
  }

  const formatDateTimeWithTimezone = (dateTimeString: any) => {
    const date = new Date(dateTimeString)
    const dateWithTimezone = new Date(date.getTime() + 7 * 60 * 60 * 1000)
    return dateWithTimezone.toLocaleString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      dateStyle: 'medium',
      timeStyle: 'short'
    })
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-primary-foreground p-4'>
      <div className='flex h-full items-stretch justify-center w-[700px] border rounded-lg overflow-hidden'>
        <div
          className='w-2/5 bg-cover bg-center p-6 flex flex-col items-start justify-start text-gray-700'
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1662120455989-5a433cec9980?q=80&w=1914&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
          }}
        ></div>
        <div className='w-3/5'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-xl font-bold text-center'>Test Infomation</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-1'>
              <h3 className='font-medium text-sm text-muted-foreground'>Test Name</h3>
              <p className='text-lg font-semibold'>{examGetResponse.title}</p>
            </div>

            <div className='space-y-1'>
              <h3 className='font-medium text-sm text-muted-foreground'>Description</h3>
              <p className='text-sm font-normal'>{examGetResponse.description}</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <h3 className='font-medium text-sm text-muted-foreground'>Start Time</h3>
                <p className='text-sm'>{formatDateTimeWithTimezone(examGetResponse.startTime)}</p>
              </div>

              <div className='space-y-1'>
                <h3 className='font-medium text-sm text-muted-foreground'>End Time</h3>
                <p className='text-sm'>{formatDateTimeWithTimezone(examGetResponse.endTime)}</p>
              </div>
            </div>

            <div className='space-y-1'>
              <h3 className='font-medium text-sm text-muted-foreground'>Duration</h3>
              <p className='text-sm'>{examGetResponse.duration} minutes</p>
            </div>

            <Button className='w-full font-semibold' onClick={handleStartQuiz}>
              START TEST
            </Button>
          </CardContent>
        </div>
      </div>
    </div>
  )
}
