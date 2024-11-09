// import React, { useState, useEffect } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Copy } from 'lucide-react'
// import QRCode from 'react-qr-code'
// import { format, parseISO } from 'date-fns'
// import { useToast } from '@/hooks/use-toast'
// import { Exam } from '@/types/type'
// import { Switch } from '@/components/ui/switch'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger
// } from '@/components/ui/dialog'
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { useForm } from 'react-hook-form'
// import { updateExamInfo } from '@/services/exams.services'

// interface ExamProps {
//   exam: Exam | null
//   setRefesh: any
// }

// interface UpdateExamProps {
//   title: string
//   startTime: string
//   endTime: string
//   duration: number
//   description: string
//   isActive: boolean
// }

// const ExamDetails: React.FC<ExamProps> = ({ exam, setRefesh }) => {
//   const { toast } = useToast()
//   const [isOpen, setIsOpen] = useState(false)
//   const [isUpdating, setIsUpdating] = useState(false)

//   // Initialize isActive state with exam's value
//   const [isActive, setIsActive] = useState(exam?.isActive || false)
//   console.log('refresh ExamDetails')

//   const form = useForm<UpdateExamProps>({
//     defaultValues: {
//       title: '',
//       startTime: '',
//       endTime: '',
//       duration: 0,
//       description: '',
//       isActive: false
//     }
//   })

//   // Reset form when exam data changes or dialog opens
//   useEffect(() => {
//     if (exam && isOpen) {
//       const formatDateForInput = (dateString: string) => {
//         return format(parseISO(dateString), "yyyy-MM-dd'T'HH:mm")
//       }

//       form.reset({
//         title: exam.title || '',
//         startTime: formatDateForInput(exam.startTime),
//         endTime: formatDateForInput(exam.endTime),
//         duration: exam.duration || 0,
//         description: exam.description || '',
//         isActive: exam.isActive || false
//       })
//     }
//   }, [exam, isOpen, form])

//   const handleCopyPasscode = async () => {
//     try {
//       await navigator.clipboard.writeText(exam?.passcode || '')
//       toast({ description: 'Passcode copied successfully' })
//     } catch (err) {
//       console.error('Failed to copy passcode:', err)
//       toast({ description: 'Failed to copy passcode', variant: 'destructive' })
//     }
//   }

//   const handleActiveToggle = async (checked: boolean) => {
//     try {
//       setIsUpdating(true)
//       if (!exam?.examId) return

//       await updateExamInfo(exam.examId, { isActive: checked })
//       setIsActive(checked)
//       setRefesh()
//       toast({ description: 'Exam status updated successfully' })
//     } catch (error) {
//       toast({ description: 'Failed to update exam status', variant: 'destructive' })
//       // Revert the switch state on error
//       setIsActive(!checked)
//     } finally {
//       setIsUpdating(false)
//     }
//   }

//   const onSubmit = async (data: UpdateExamProps) => {
//     if (!exam?.examId) return

//     try {
//       setIsUpdating(true)
//       const payload: UpdateExamProps = {
//         title: data.title,
//         startTime: new Date(data.startTime).toISOString(),
//         endTime: new Date(data.endTime).toISOString(),
//         duration: Number(data.duration),
//         description: data.description,
//         isActive: isActive // Use the current switch state
//       }

//       await updateExamInfo(exam.examId, payload)
//       setIsOpen(false)
//       setRefesh()
//       toast({ description: 'Exam updated successfully' })
//     } catch (error) {
//       toast({ description: 'Failed to update exam', variant: 'destructive' })
//     } finally {
//       setIsUpdating(false)
//     }
//   }

//   const qrValue = `http://localhost:3000/join?passcode=${exam?.passcode || ''}`

//   const formatDateTime = (isoString: string) => {
//     return format(new Date(isoString), 'dd/MM/yyyy HH:mm')
//   }

//   return (
//     <div className='w-full mx-auto px-2'>
//       <Card className='rounded-md'>
//         <CardHeader className='flex flex-row items-center justify-between'>
//           <CardTitle className='text-2xl font-bold'>{exam?.title || ''}</CardTitle>
//           <div className='flex items-center gap-4'>
//             <div className='flex items-center space-x-2'>
//               <Switch checked={isActive} onCheckedChange={handleActiveToggle} disabled={isUpdating} id='exam-status' />
//               <label htmlFor='exam-status' className='text-sm font-medium'>
//                 {isActive ? 'Active' : 'Inactive'}
//               </label>
//             </div>
//             <Dialog open={isOpen} onOpenChange={setIsOpen}>
//               <DialogTrigger asChild>
//                 <Button variant='outline'>Edit Exam</Button>
//               </DialogTrigger>
//               <DialogContent className='max-w-2xl'>
//                 <DialogHeader>
//                   <DialogTitle>Edit Exam Details</DialogTitle>
//                   <DialogDescription>
//                     Make changes to exam information here. Click save when you're done.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <Form {...form}>
//                   <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
//                     <FormField
//                       control={form.control}
//                       name='title'
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Title</FormLabel>
//                           <FormControl>
//                             <Input {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <div className='grid grid-cols-2 gap-4'>
//                       <FormField
//                         control={form.control}
//                         name='startTime'
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Start Time</FormLabel>
//                             <FormControl>
//                               <Input type='datetime-local' {...field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name='endTime'
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>End Time</FormLabel>
//                             <FormControl>
//                               <Input type='datetime-local' {...field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                     <FormField
//                       control={form.control}
//                       name='duration'
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Duration (minutes)</FormLabel>
//                           <FormControl>
//                             <Input type='number' {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name='description'
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Description</FormLabel>
//                           <FormControl>
//                             <Textarea {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <DialogFooter>
//                       <Button type='submit' disabled={isUpdating}>
//                         {isUpdating ? 'Saving...' : 'Save changes'}
//                       </Button>
//                     </DialogFooter>
//                   </form>
//                 </Form>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </CardHeader>
//         <CardContent className='space-y-6 grid grid-cols-12'>
//           <div className='flex flex-col col-span-7'>
//             <div className='space-y-4'>
//               <div className='grid grid-cols-1 md:grid-cols-2 gap-y-10'>
//                 <div className='flex items-center gap-2'>
//                   <div className='space-y-1'>
//                     <p className='text-sm text-gray-500'>Duration</p>
//                     <p className='font-medium'>{exam?.duration || 0} minutes</p>
//                   </div>
//                 </div>
//                 <div className='space-y-4'>
//                   <div>
//                     <p className='text-sm text-gray-500 mb-1'>Passcode</p>
//                     <div className='flex items-center gap-2'>
//                       <code className='bg-gray-100 px-4 py-2 rounded-lg font-mono text-lg'>{exam?.passcode || ''}</code>
//                       <Button variant='outline' size='icon' onClick={handleCopyPasscode} className='flex-shrink-0'>
//                         <Copy className='h-4 w-4' />
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <p className='text-sm text-gray-500'>Start time</p>
//                   <p className='font-medium'>{formatDateTime(exam?.startTime || new Date().toISOString())}</p>
//                 </div>
//                 <div>
//                   <p className='text-sm text-gray-500'>End time</p>
//                   <p className='font-medium'>{formatDateTime(exam?.endTime || new Date().toISOString())}</p>
//                 </div>
//                 <div className='w-full col-span-2'>
//                   <h3 className='font-semibold mb-2'>Description</h3>
//                   <p className='text-gray-600 whitespace-pre-wrap'>{exam?.description || ''}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className='flex flex-col gap-6 items-center w-full col-span-5'>
//             <div className='flex flex-col items-center'>
//               <div className='bg-white pb-4 rounded-lg'>
//                 <QRCode value={qrValue} size={200} className='h-auto max-w-full' />
//               </div>
//               <p className='text-sm text-gray-500'>Scan the QR code to access the exam</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default ExamDetails

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import QRCode from 'react-qr-code'
import { format, parseISO } from 'date-fns'
import { useToast } from '@/hooks/use-toast'
import { Exam } from '@/types/type'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { updateExamInfo } from '@/services/exams.services'

interface ExamProps {
  exam: Exam | null
  setRefesh: any
}

interface UpdateExamProps {
  title: string
  startTime: string
  endTime: string
  duration: number
  description: string
  isActive: boolean
}

function compareDateWithNow(inputDate: any) {
  const now = new Date()
  const input = new Date(inputDate)

  if (input < now) {
    return true
  }
  return false
}
const ExamDetails: React.FC<ExamProps> = ({ exam: initialExam, setRefesh }) => {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [exam, setExam] = useState(initialExam)
  const [isActive, setIsActive] = useState(initialExam?.isActive || false)

  useEffect(() => {
    setExam(initialExam)
    setIsActive(initialExam?.isActive || false)
  }, [initialExam])

  const form = useForm<UpdateExamProps>({
    defaultValues: {
      title: '',
      startTime: '',
      endTime: '',
      duration: 0,
      description: '',
      isActive: false
    }
  })

  useEffect(() => {
    if (exam && isOpen) {
      const formatDateForInput = (dateString: string) => {
        return format(parseISO(dateString), "yyyy-MM-dd'T'HH:mm")
      }

      form.reset({
        title: exam.title || '',
        startTime: formatDateForInput(exam.startTime),
        endTime: formatDateForInput(exam.endTime),
        duration: exam.duration || 0,
        description: exam.description || '',
        isActive: exam.isActive || false
      })
    }
  }, [exam, isOpen, form])

  const handleCopyPasscode = async () => {
    try {
      await navigator.clipboard.writeText(exam?.passcode || '')
      toast({ description: 'Passcode copied successfully' })
    } catch (err) {
      console.error('Failed to copy passcode:', err)
      toast({ description: 'Failed to copy passcode', variant: 'destructive' })
    }
  }

  const handleActiveToggle = async (checked: boolean) => {
    try {
      setIsUpdating(true)
      if (!exam?.examId) return

      const updatedData = await updateExamInfo(exam.examId, { isActive: checked })
      setIsActive(checked)
      setExam((prev) => ({ ...prev!, ...updatedData }))
      setRefesh()
      toast({ description: 'Exam status updated successfully' })
    } catch (error) {
      toast({ description: 'Failed to update exam status', variant: 'destructive' })
      setIsActive(!checked)
    } finally {
      setIsUpdating(false)
    }
  }

  const onSubmit = async (data: UpdateExamProps) => {
    if (!exam?.examId) return

    try {
      setIsUpdating(true)
      const payload = {
        title: data.title,
        startTime: new Date(data.startTime).toISOString(),
        endTime: new Date(data.endTime).toISOString(),
        duration: Number(data.duration),
        description: data.description,
        isActive: isActive
      }

      const updatedExam = await updateExamInfo(exam.examId, payload)
      setExam((prev) => ({
        ...prev!,
        ...updatedExam
      }))
      setIsOpen(false)
      setRefesh()
      toast({ description: 'Exam updated successfully' })
    } catch (error) {
      toast({ description: 'Failed to update exam', variant: 'destructive' })
    } finally {
      setIsUpdating(false)
    }
  }

  const qrValue = `https://fe-online-examination.vercel.app/join?passcode=${exam?.passcode || ''}`

  const formatDateTime = (isoString: string) => {
    return format(new Date(isoString), 'dd/MM/yyyy HH:mm')
  }

  return (
    <div className='w-full mx-auto px-2'>
      <Card className='rounded-md'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-2xl font-bold'>{exam?.title || ''}</CardTitle>
          <div className='flex items-center gap-4'>
            <div className='flex items-center space-x-2'>
              <Switch
                checked={isActive}
                onCheckedChange={handleActiveToggle}
                disabled={isUpdating || compareDateWithNow(exam?.startTime)}
                id='exam-status'
              />
              <label htmlFor='exam-status' className='text-sm font-medium'>
                {isActive ? 'Active' : 'Inactive'}
              </label>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant='outline' disabled={isUpdating || compareDateWithNow(exam?.startTime)}>
                  Edit Exam
                </Button>
              </DialogTrigger>
              <DialogContent className='max-w-2xl'>
                <DialogHeader>
                  <DialogTitle>Edit Exam Details</DialogTitle>
                  <DialogDescription>
                    Make changes to exam information here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                      control={form.control}
                      name='title'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='grid grid-cols-2 gap-4'>
                      <FormField
                        control={form.control}
                        name='startTime'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                              <Input type='datetime-local' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='endTime'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Time</FormLabel>
                            <FormControl>
                              <Input type='datetime-local' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name='duration'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (minutes)</FormLabel>
                          <FormControl>
                            <Input type='number' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='description'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type='submit' disabled={isUpdating || compareDateWithNow(exam?.startTime)}>
                        {isUpdating ? 'Saving...' : 'Save changes'}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className='space-y-6 grid grid-cols-12'>
          <div className='flex flex-col col-span-7'>
            <div className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-y-10'>
                <div className='flex items-center gap-2'>
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
