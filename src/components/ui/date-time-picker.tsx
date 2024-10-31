import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface DateTimePickerProps {
  date?: Date
  setDate?: (date: Date) => void
}

export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP HH:mm:ss') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
        {date && (
          <div className='p-3 border-t'>
            <input
              type='time'
              value={format(date, 'HH:mm')}
              onChange={(e) => {
                const [hours, minutes] = e.target.value.split(':')
                const newDate = new Date(date)
                newDate.setHours(parseInt(hours))
                newDate.setMinutes(parseInt(minutes))
                setDate?.(newDate)
              }}
              className='w-full border rounded p-2'
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
