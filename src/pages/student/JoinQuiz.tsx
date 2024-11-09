import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PillInput from '@/components/ui/input-custom'
import { useEffect } from 'react'
import { joinQuiz } from '@/services/students.services'
import { useDispatch } from 'react-redux'
import { setExamData } from '@/store/slices/examSlice'
import { useToast } from '@/hooks/use-toast'

const schema = yup
  .object({
    studentId: yup
      .string()
      .required('Student ID is required')
      .matches(/^[0-9]+$/, 'Student ID must contain only numbers'),
    name: yup
      .string()
      .required('Full name is required')
      .min(2, 'Full name must be at least 2 characters')
      .max(50, 'Full name must not exceed 50 characters'),
    email: yup.string().required('Email is required').email('Must be a valid email'),
    passcode: yup.string().required('Passcode is required')
  })
  .required()

type FormData = yup.InferType<typeof schema>

export default function JoinQuiz() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      passcode: '',
      name: '',
      email: '',
      studentId: ''
    }
  })
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const { toast } = useToast()

  useEffect(() => {
    const passcodeParam = searchParams.get('passcode')
    if (passcodeParam) {
      setValue('passcode', passcodeParam || '')
    }
  }, [searchParams, setValue])

  const onSubmit = async (data: FormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Form submitted:', JSON.stringify(data, null, 2))
      const response = await joinQuiz(data)

      if (response) {
        console.log(response)
        localStorage.setItem('st_access_token', response?.examResultToken)
        localStorage.setItem('exam_id', response?.examGetResponse?.examId)
        dispatch(setExamData(response))
        toast({ description: 'Join test successfully' })
      }

      navigate('/start')
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className='min-h-screen w-full flex items-start md:items-center justify-center bg-slate-100 p-4'>
      <div className='w-full max-w-4xl flex flex-col md:flex-row items-stretch justify-center border rounded-lg overflow-hidden bg-white'>
        {/* Background image - hidden on mobile, visible from md breakpoint */}
        <div
          className='hidden md:block md:w-2/5 bg-cover bg-center'
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1662120455989-5a433cec9980?q=80&w=1914&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
          }}
        />

        {/* Form section - full width on mobile, 3/5 width from md breakpoint */}
        <div className='w-full md:w-3/5 p-4'>
          <CardHeader className='space-y-1 px-0 md:px-4'>
            <CardTitle className='text-xl md:text-2xl font-bold'>Student Information</CardTitle>
            <CardDescription className='font-light'>Please enter your student information</CardDescription>
          </CardHeader>

          <CardContent className='p-0 md:p-4'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div className='flex flex-col w-full gap-4 md:gap-6'>
                <PillInput
                  label='Passcode'
                  id='passcode'
                  type='passcode'
                  placeholder='Enter your passcode'
                  register={register('passcode')}
                  error={errors.passcode?.message}
                  disabled={isSubmitting}
                />
                <PillInput
                  label='Student ID'
                  id='studentId'
                  type='studentId'
                  placeholder='Enter your Student ID'
                  register={register('studentId')}
                  error={errors.studentId?.message}
                  disabled={isSubmitting}
                />
                <PillInput
                  label='Full Name'
                  id='name'
                  type='name'
                  placeholder='Enter your name'
                  register={register('name')}
                  error={errors?.fullName?.message}
                  disabled={isSubmitting}
                />
                <PillInput
                  label='Student Email'
                  id='email'
                  type='email'
                  placeholder='Enter your email'
                  register={register('email')}
                  error={errors.email?.message}
                  disabled={isSubmitting}
                />
                <Button className='w-full font-semibold min-h-[45px] mt-4' type='submit' disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </form>
          </CardContent>
        </div>
      </div>
    </div>
  )
}
