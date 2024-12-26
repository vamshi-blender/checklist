import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'

export function TaskInput({ date, setDate, onAddTask }) {
  const [priority, setPriority] = useState('high')
  const [taskText, setTaskText] = useState('')
  
  const fieldHeight = "h-10"
  const textFieldWidth = "w-[300px]"
  const calendarFieldWidth = "w-[130px]"
  const ddFieldWidth = "w-[120px]"
  const buttonFieldWidth = "w-[100px]"

  const handleSubmit = (e) => {
    e.preventDefault()
    if (date && taskText.trim()) {
      onAddTask({
        date,
        priority,
        text: taskText.trim()
      })
      setTaskText('') // Reset input after adding
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <Input
        type="text"
        placeholder="Enter your task here..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className={`shadow-sm ${fieldHeight} ${textFieldWidth} flex-grow`}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              `justify-start text-left font-normal ${fieldHeight} ${calendarFieldWidth}`,
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Select value={priority} onValueChange={setPriority}>
        <SelectTrigger className={`${fieldHeight} ${ddFieldWidth}`}>
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="high">High Priority</SelectItem>
          <SelectItem value="low">Low Priority</SelectItem>
        </SelectContent>
      </Select>

      <Button 
        type="submit" 
        className={`${fieldHeight} ${buttonFieldWidth}`}
        disabled={!date || !taskText.trim()}
      >
        Add
      </Button>
    </form>
  )
}