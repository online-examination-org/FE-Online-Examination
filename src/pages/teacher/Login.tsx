import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { login } from '@/services/teachers.services'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import PillInput from '@/components/ui/input-custom'

// Define the form schema with Yup
const loginSchema = yup
  .object({
    email: yup.string().required('Email is required').email('Please enter a valid email address'),
    password: yup.string().required('Password is required')
  })
  .required()

// TypeScript type for form values - inferred from Yup schema
type LoginFormValues = yup.InferType<typeof loginSchema>

export default function Login() {
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState<string>('')
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmitLogin = async (data: LoginFormValues) => {
    try {
      setLoginError('') // Clear any previous errors
      const response = await login(data)

      if (response.data?.access_token) {
        localStorage.setItem('access_token', response.data.access_token)
        navigate('/')
      } else {
        setLoginError('Invalid response from server')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      localStorage.removeItem('access_token')
      toast({
        description: 'Invalid email or password. Please try again.',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-primary-foreground'>
      <Card className='w-full mx-4 max-w-sm'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold'>Login</CardTitle>
          <CardDescription>Enter your email and password to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmitLogin)} className='space-y-5'>
            <div className='flex flex-col w-full gap-6'>
              <PillInput
                label='Email'
                id='email'
                type='email'
                placeholder='yourmail@example.com'
                register={register('email')}
                error={errors.email?.message}
                disabled={isSubmitting}
              />

              <PillInput
                label='Password'
                id='password'
                type='password'
                placeholder='yourmail@example.com'
                register={register('password')}
                error={errors.password?.message}
                disabled={isSubmitting}
              />

              {loginError && (
                <div className='mb-4 text-red-400 text-[14px] pt-1 h-[30px] border border-red-400 rounded-lg flex items-center justify-center'>
                  {loginError}
                </div>
              )}
              <div className='w-full'>
                <Button type='submit' className='w-full mt-5 min-h-[45px]' disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
