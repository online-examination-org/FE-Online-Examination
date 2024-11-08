import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

const TestCompletion = () => {
  const startTime = 'Thứ Bảy, 26 tháng 10 2024, 9:31 AM'
  const endTime = 'Thứ Bảy, 26 tháng 10 2024, 9:41 AM'
  const duration = '9 phút 12 giây'
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-6 bg-white p-10 border rounded-lg'>
        <div className='text-center space-y-2'>
          <h1 className='text-2xl font-bold'>U successfully submitted the test</h1>
          <p className='text-gray-600'>The test result is stored in the system</p>

          <div className='flex justify-center my-6'>
            <CheckCircle2 className='h-12 w-12 text-green-500' />
          </div>
        </div>

        <Card className='shadow-sm'>
          <CardContent className='pt-6'>
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-2 text-sm space-y-3'>
                <div className='text-gray-500 pt-3'>Trạng thái</div>
                <div className='font-medium'>Đã xong</div>

                <div className='text-gray-500'>Bắt đầu vào lúc</div>
                <div className='font-medium'>{startTime}</div>

                <div className='text-gray-500'>Kết thúc lúc</div>
                <div className='font-medium'>{endTime}</div>

                <div className='text-gray-500'>Thời gian thực hiện</div>
                <div className='font-medium'>{duration}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className='w-full'>
          <Button className='w-full mt-4 bg-black text-white' onClick={() => (window.location.href = '/')}>
            Back to homepage
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TestCompletion
