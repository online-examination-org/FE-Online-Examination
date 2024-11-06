import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, CalendarClock } from 'lucide-react'
import QRCode from 'react-qr-code'
import { format } from 'date-fns'

// interface ExamProps {
//   exam: {
//     exam_id: number
//     teacher_id: number
//     title: string
//     passcode: string
//     start_time: string
//     end_time: string
//     duration: number
//     create_at: number
//     description: string
//   }
// }

const exam = {
  exam_id: 1,
  teacher_id: 1,
  title: 'Bài kiểm tra cuối kỳ môn Toán lớp 12',
  passcode: 'ABC123',
  start_time: '2024-03-20T09:00:00Z',
  end_time: '2024-03-20T11:00:00Z',
  duration: 120,
  create_at: 1710921600,
  description:
    'Bài kiểm tra cuối kỳ cho môn Toán lớp 12, bao gồm các kiến thức về đạo hàm, tích phân, và hình học không gian.'
}

const ExamDetails = () => {
  const handleCopyPasscode = async () => {
    try {
      await navigator.clipboard.writeText(exam.passcode)
      alert('Đã copy passcode!')
    } catch (err) {
      console.error('Failed to copy passcode:', err)
      alert('Không thể copy passcode!')
    }
  }

  // Tạo URL cho QR code (ví dụ: domain của bạn + exam_id)
  const qrValue = `http://localhost:3000/join?passcode=${exam.passcode}`

  // Format dates
  const formatDateTime = (isoString: string) => {
    return format(new Date(isoString), 'dd/MM/yyyy HH:mm')
  }

  return (
    <div className='w-full mx-auto px-2'>
      <Card className='rounded-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>{exam.title}</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6 grid grid-cols-12'>
          {/* Thông tin thời gian */}
          <div className='flex flex-col col-span-7'>
            <div className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-y-10'>
                <div className='flex items-center gap-2'>
                  <CalendarClock className='w-5 h-5 text-gray-500' />
                  <div className='space-y-1'>
                    <p className='text-sm text-gray-500'>Thời gian làm bài</p>
                    <p className='font-medium'>{exam.duration} phút</p>
                  </div>
                </div>
                <div className='space-y-4'>
                  <div>
                    <p className='text-sm text-gray-500 mb-1'>Mã truy cập (Passcode)</p>
                    <div className='flex items-center gap-2'>
                      <code className='bg-gray-100 px-4 py-2 rounded-lg font-mono text-lg'>{exam.passcode}</code>
                      <Button variant='outline' size='icon' onClick={handleCopyPasscode} className='flex-shrink-0'>
                        <Copy className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Thời gian bắt đầu</p>
                  <p className='font-medium'>{formatDateTime(exam.start_time)}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Thời gian kết thúc</p>
                  <p className='font-medium'>{formatDateTime(exam.end_time)}</p>
                </div>
                <div className='w-full col-span-2'>
                  <h3 className='font-semibold mb-2'>Mô tả</h3>
                  <p className='text-gray-600 whitespace-pre-wrap'>{exam.description}</p>
                </div>
              </div>
            </div>
          </div>
          {/* QR Code và Passcode */}
          <div className='flex flex-col gap-6 items-center w-full col-span-5'>
            <div className='flex flex-col items-center'>
              <div className='bg-white pb-4 rounded-lg'>
                <QRCode value={qrValue} size={200} className='h-auto max-w-full' />
              </div>
              <p className='text-sm text-gray-500'>Quét mã QR để truy cập bài thi</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ExamDetails
