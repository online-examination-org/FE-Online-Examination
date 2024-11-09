/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

const TestCompletion = () => {
  const formatDateTimeWithTimezone = (dateTimeString) => {
    const date = new Date(dateTimeString)
    const dateWithTimezone = new Date(date.getTime())
    return dateWithTimezone.toLocaleString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      dateStyle: 'medium',
      timeStyle: 'short'
    })
  }

  // Function to calculate duration between start and end times
  const differenceTime = (startTime: any, endTime: any) => {
    const start = new Date(startTime)
    const end = new Date(endTime)

    const diffMs = end.getTime() - start.getTime()
    const minutes = Math.floor(diffMs / 60000)
    const seconds = Math.floor((diffMs % 60000) / 1000)

    return `${minutes}m ${seconds}s`
  }

  // Get start time from localStorage and calculate duration
  const startTime = localStorage.getItem('start_time')
  const endTime = localStorage.getItem('finish_at')
  const duration = differenceTime(startTime, endTime)

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center'>
      <div className='w-full max-w-md space-y-6 bg-white p-10 border rounded-lg'>
        <div className='text-center space-y-2'>
          <h1 className='text-2xl font-bold'>Submitted successfully</h1>
          <p className='text-gray-600'>The test result is stored in the system</p>

          <div className='flex justify-center my-6'>
            <CheckCircle2 className='h-12 w-12 text-green-500' />
          </div>
        </div>

        <Card className='shadow-sm'>
          <CardContent className='pt-6'>
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-2 text-sm space-y-3'>
                <div className='text-gray-500 pt-3'>Status</div>
                <div className='font-medium'>Completed</div>

                <div className='text-gray-500'>Started at</div>
                <div className='font-medium'>{formatDateTimeWithTimezone(startTime)}</div>

                <div className='text-gray-500'>Finished at</div>
                <div className='font-medium'>{formatDateTimeWithTimezone(endTime)}</div>

                <div className='text-gray-500'>Duration</div>
                <div className='font-medium'>{duration}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className='w-full'>
          <Button className='w-full mt-4 bg-black text-white' onClick={() => (window.location.href = '/join')}>
            Back to Join
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TestCompletion
