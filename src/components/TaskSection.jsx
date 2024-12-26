import React from 'react'
import { cn } from '@/lib/utils'
import { TaskItem } from './TaskItem'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

export function TaskSection({ 
  tasks,
  className,
  emptyMessage,
  onDeleteTask,
  onChangeTaskState,
  onUpdateTaskText,
  onCheckChange
}) {
  const itemIds = tasks.map(task => task.id)

  return (
    <div className={cn("p-4 rounded-[7px]", className)}>
      {tasks.length > 0 ? (
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {tasks.map((task, index) => (
              <TaskItem 
                key={task.id}
                id={task.id}
                text={task.text}
                checked={task.checked}
                onDelete={() => onDeleteTask(index)}
                onStateChange={() => onChangeTaskState(index)}
                onTextChange={(newText) => onUpdateTaskText(index, newText)}
                onCheckChange={(checked) => onCheckChange(index, checked)}
              />
            ))}
          </div>
        </SortableContext>
      ) : (
        <div className="text-slate-500 text-sm">{emptyMessage}</div>
      )}
    </div>
  )
}