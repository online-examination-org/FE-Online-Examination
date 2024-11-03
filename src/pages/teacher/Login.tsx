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
          <form onSubmit={handleSubmit(onSubmitLogin)} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                {...register('password')}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
            </div>

            {loginError && (
              <div className='mb-4 text-red-400 text-[14px] pt-1 h-[30px] border border-red-400 rounded-lg flex item-center justify-center'>
                {loginError}
              </div>
            )}
            <Button type='submit' className='w-full' disabled={isSubmitting}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
