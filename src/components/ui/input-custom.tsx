import React from 'react'
import { Input } from '@/components/ui/input'

interface PillInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  error?: string
  disabled?: boolean
  register?: any
  className?: string //
}

const PillInput: React.FC<PillInputProps> = ({ label, id, error, disabled, register, className, ...props }) => {
  return (
    <div className='flex flex-col'>
      <div className={`relative h-[50px] pt-4 mt-2 border border-gray-300 rounded-md ${className}`}>
        <div className='absolute -top-3 left-3 z-10'>
          <span className='px-3 py-0.4 bg-gray-300 text-black rounded-full border' style={{ fontSize: '10px' }}>
            {label}
          </span>
        </div>
        <Input
          id={id}
          className={`border-none h-[50px] absolute top-0 ${error ? 'border-red-500' : ''} transition-colors pt-2`}
          disabled={disabled}
          {...(register || {})}
          {...props}
        />
      </div>
      {error && <p className='mt-1 text-sm text-red-500 ml-2'>{error}</p>}
    </div>
  )
}

export default PillInput
