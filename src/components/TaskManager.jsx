import React from 'react'
import { SearchBar } from './SearchBar'
import { TaskInput } from './TaskInput'
import { TaskList } from './TaskList'
import { useTaskManager } from '../hooks/useTaskManager'
import { useDate } from '../hooks/useDate'

export function TaskManager() {
  const [date, setDate] = useDate()
  const { 
    tasks, 
    handleAddTask, 
    handleDeleteTask, 
    handleChangeTaskPriority, 
    handleUpdateTaskText,
    handleTasksReorder,
    handleCheckChange
  } = useTaskManager()

  const onAddTask = (task) => {
    handleAddTask(task)
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-slate-50 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto space-y-4">
            <SearchBar />
            <TaskInput 
              date={date} 
              setDate={setDate}
              onAddTask={onAddTask}
            />
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 mt-[130px] bg-slate-50">
        <div className="container mx-auto px-4 pb-4">
          <div className="max-w-4xl mx-auto">
            <TaskList 
              tasks={tasks}
              onDeleteTask={handleDeleteTask}
              onChangeTaskPriority={handleChangeTaskPriority}
              onUpdateTaskText={handleUpdateTaskText}
              onTasksReorder={handleTasksReorder}
              onCheckChange={handleCheckChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}