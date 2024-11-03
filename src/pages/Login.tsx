import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useForm, SubmitHandler } from 'react-hook-form'
import { login } from '@/services/teachers.services'
import { useNavigate } from 'react-router-dom'

type LoginFormValues = {
  email: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>()

  const onSubmitLogin: SubmitHandler<LoginFormValues> = async (data) => {
    console.log(data)
    try {
      const response = await login(data)
      console.log(response)
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('role', response.data.role)
      navigate('/')
    } catch (err) {
      console.log(err)
      localStorage.removeItem('access_token')
      localStorage.removeItem('role')
    }
  }

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-primary-foreground'>
      <Card className='mx-auto max-w-sm'>
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
                type='text'
                placeholder='m@example.com'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                {...register('password', {
                  required: 'Password is required'
                })}
              />
              {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
            </div>
            <Button type='submit' className='w-full'>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
