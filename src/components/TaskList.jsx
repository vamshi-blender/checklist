import React from 'react'
import { TaskCard } from './TaskCard'
import { groupTasksByDate } from '../utils/taskUtils'

export function TaskList({ 
  tasks, 
  onDeleteTask, 
  onChangeTaskPriority, 
  onUpdateTaskText,
  onTasksReorder,
  onCheckChange 
}) {
  const groupedTasks = groupTasksByDate(tasks)

  return (
    <div className="space-y-4">
      {Object.values(groupedTasks).map((group) => (
        <TaskCard
          key={group.date.toISOString()}
          date={group.date}
          highPriorityTasks={group.highPriority}
          lowPriorityTasks={group.lowPriority}
          onDeleteTask={onDeleteTask}
          onChangeTaskPriority={onChangeTaskPriority}
          onUpdateTaskText={onUpdateTaskText}
          onTasksReorder={onTasksReorder}
          onCheckChange={onCheckChange}
        />
      ))}
    </div>
  )
}