import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

const schema = yup
  .object({
    studentId: yup
      .string()
      .required('Student ID is required')
      .matches(/^[0-9]+$/, 'Student ID must contain only numbers'),
    fullName: yup
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
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      studentId: '',
      fullName: '',
      email: '',
      passcode: ''
    }
  })
  const navigate = useNavigate()

  const onSubmit = async (data: FormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Form submitted:', data)
      reset()
      navigate('/start')
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-slate-100 p-4'>
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
            <CardTitle className='text-xl font-bold'>Student Information</CardTitle>
            <CardDescription>Please enter your student information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='passcode'>Passcode</Label>
                <Input
                  id='passcode'
                  type='password'
                  {...register('passcode')}
                  placeholder='Enter your passcode'
                  className={errors.passcode ? 'border-red-500' : ''}
                />
                {errors.passcode && <p className='text-sm text-red-500 mt-1'>{errors.passcode.message}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='studentId'>Student ID</Label>
                <Input
                  id='studentId'
                  {...register('studentId')}
                  placeholder='Enter your student ID'
                  className={errors.studentId ? 'border-red-500' : ''}
                />
                {errors.studentId && <p className='text-sm text-red-500 mt-1'>{errors.studentId.message}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='fullName'>Full Name</Label>
                <Input
                  id='fullName'
                  {...register('fullName')}
                  placeholder='Enter your full name'
                  className={errors.fullName ? 'border-red-500' : ''}
                />
                {errors.fullName && <p className='text-sm text-red-500 mt-1'>{errors.fullName.message}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>Student Email</Label>
                <Input
                  id='email'
                  type='email'
                  {...register('email')}
                  placeholder='Enter your email'
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className='text-sm text-red-500 mt-1'>{errors.email.message}</p>}
              </div>

              <Button className='w-full font-semibold' type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </CardContent>
        </div>
      </div>
    </div>
  )
}
