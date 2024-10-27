import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

interface TestInfo {
  testName: string
  testDescription: string
  startDateTime: string
  endDateTime: string
  duration: string
}

export default function TestInfoDisplay() {
  const [testInfo, setTestInfo] = useState<TestInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTestInfo = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const mockData: TestInfo = {
          testName: 'Final Examination',
          testDescription:
            'This is the final examination for the course. Please read all instructions carefully before starting.',
          startDateTime: '2024-03-20T09:00',
          endDateTime: '2024-03-20T11:00',
          duration: '120'
        }
        setTestInfo(mockData)
      } catch (error) {
        console.error('Error fetching test info:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestInfo()
  }, [])

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    })
  }

  if (isLoading) {
    return (
      <div className='min-h-screen w-full flex items-center justify-center bg-primary-foreground'>
        <div className='text-primary'>Loading test information...</div>
      </div>
    )
  }

  if (!testInfo) {
    return (
      <div className='min-h-screen w-full flex items-center justify-center bg-primary-foreground'>
        <div className='text-destructive'>Error loading test information</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-primary-foreground p-4'>
      <Card className='w-full max-w-2xl'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center'>Test Infomation</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Test Name */}
          <div className='space-y-1'>
            <h3 className='font-medium text-sm text-muted-foreground'>Test Name</h3>
            <p className='text-lg font-semibold'>{testInfo.testName}</p>
          </div>

          {/* Description */}
          <div className='space-y-1'>
            <h3 className='font-medium text-sm text-muted-foreground'>Description</h3>
            <p className='text-sm'>{testInfo.testDescription}</p>
          </div>

          {/* Time Information */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-1'>
              <h3 className='font-medium text-sm text-muted-foreground'>Start Time</h3>
              <p className='text-sm'>{formatDateTime(testInfo.startDateTime)}</p>
            </div>

            <div className='space-y-1'>
              <h3 className='font-medium text-sm text-muted-foreground'>End Time</h3>
              <p className='text-sm'>{formatDateTime(testInfo.endDateTime)}</p>
            </div>
          </div>

          {/* Duration */}
          <div className='space-y-1'>
            <h3 className='font-medium text-sm text-muted-foreground'>Duration</h3>
            <p className='text-sm'>{testInfo.duration} minutes</p>
          </div>

          {/* Start Test Button */}
          <Button
            className='w-full font-semibold'
            onClick={() => {
              // Handle start test logic
              navigate('/make-test')
              console.log('Starting test...')
            }}
          >
            START TEST
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
