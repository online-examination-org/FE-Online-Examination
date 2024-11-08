import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import QRCode from 'react-qr-code'
import { format } from 'date-fns'
import { useToast } from '@/hooks/use-toast'
import { Exam } from '@/types/type'

interface ExamProps {
  exam: Exam | null
}

const ExamDetails: React.FC<ExamProps> = ({ exam }) => {
  const { toast } = useToast()
  const handleCopyPasscode = async () => {
    try {
      await navigator.clipboard.writeText(exam?.passcode || '')
      toast({ description: 'Passcode copied successfully' })
    } catch (err) {
      console.error('Failed to copy passcode:', err)
      toast({ description: 'Failed to copy passcode', variant: 'destructive' })
    }
  }

  // Tạo URL cho QR code (ví dụ: domain của bạn + exam_id)
  const qrValue = `http://localhost:3000/join?passcode=${exam?.passcode || ''}`

  // Format dates
  const formatDateTime = (isoString: string) => {
    return format(new Date(isoString), 'dd/MM/yyyy HH:mm')
  }

  return (
    <div className='w-full mx-auto px-2'>
      <Card className='rounded-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>{exam?.title || ''}</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6 grid grid-cols-12'>
          {/* Thông tin thời gian */}
          <div className='flex flex-col col-span-7'>
            <div className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-y-10'>
                <div className='flex items-center gap-2'>
                  {/* <CalendarClock className='w-5 h-5 text-gray-500' /> */}
                  <div className='space-y-1'>
                    <p className='text-sm text-gray-500'>Duration</p>
                    <p className='font-medium'>{exam?.duration || 0} minutes</p>
                  </div>
                </div>
                <div className='space-y-4'>
                  <div>
                    <p className='text-sm text-gray-500 mb-1'>Passcode</p>
                    <div className='flex items-center gap-2'>
                      <code className='bg-gray-100 px-4 py-2 rounded-lg font-mono text-lg'>{exam?.passcode || ''}</code>
                      <Button variant='outline' size='icon' onClick={handleCopyPasscode} className='flex-shrink-0'>
                        <Copy className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Start time</p>
                  <p className='font-medium'>{formatDateTime(exam?.startTime || new Date().toISOString())}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>End time</p>
                  <p className='font-medium'>{formatDateTime(exam?.endTime || new Date().toISOString())}</p>
                </div>
                <div className='w-full col-span-2'>
                  <h3 className='font-semibold mb-2'>Description</h3>
                  <p className='text-gray-600 whitespace-pre-wrap'>{exam?.description || ''}</p>
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
              <p className='text-sm text-gray-500'>Scan the QR code to access the exam</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ExamDetails
