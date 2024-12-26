import React, { useState } from 'react'
import { format } from 'date-fns'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TaskSection } from './TaskSection'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

export function TaskCard({ 
  date,
  highPriorityTasks,
  lowPriorityTasks,
  onDeleteTask,
  onChangeTaskPriority,
  onUpdateTaskText,
  onTasksReorder,
  onCheckChange
}) {
  const [isExpanded, setIsExpanded] = useState(true)
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragEnd = (event, priority) => {
    const { active, over } = event
    
    if (active.id !== over?.id) {
      const oldIndex = priority === 'high' 
        ? highPriorityTasks.findIndex(task => task.id === active.id)
        : lowPriorityTasks.findIndex(task => task.id === active.id)
      const newIndex = priority === 'high'
        ? highPriorityTasks.findIndex(task => task.id === over.id)
        : lowPriorityTasks.findIndex(task => task.id === over.id)

      const newTasks = priority === 'high'
        ? arrayMove(highPriorityTasks, oldIndex, newIndex)
        : arrayMove(lowPriorityTasks, oldIndex, newIndex)

      onTasksReorder(date, priority, newTasks)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-lg">
      <div className="p-4">
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="text-sm text-black font-semibold">
            {format(date, "dd MMM yyyy")}
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
        
        <div
          className={cn(
            "mt-2 space-y-2 transition-all duration-200",
            isExpanded ? "block" : "hidden"
          )}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => handleDragEnd(event, 'high')}
          >
            <TaskSection
              tasks={highPriorityTasks}
              className="bg-[#fef2f2]"
              emptyMessage="No high priority tasks"
              onDeleteTask={(index) => onDeleteTask(date, 'high', index)}
              onChangeTaskState={(index) => onChangeTaskPriority(date, 'high', index)}
              onUpdateTaskText={(index, newText) => onUpdateTaskText(date, 'high', index, newText)}
              onCheckChange={(index, checked) => onCheckChange(date, 'high', index, checked)}
            />
          </DndContext>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => handleDragEnd(event, 'low')}
          >
            <TaskSection
              tasks={lowPriorityTasks}
              className="bg-[#eff6ff]"
              emptyMessage="No low priority tasks"
              onDeleteTask={(index) => onDeleteTask(date, 'low', index)}
              onChangeTaskState={(index) => onChangeTaskPriority(date, 'low', index)}
              onUpdateTaskText={(index, newText) => onUpdateTaskText(date, 'low', index, newText)}
              onCheckChange={(index, checked) => onCheckChange(date, 'low', index, checked)}
            />
          </DndContext>
        </div>
      </div>
    </div>
  )
}