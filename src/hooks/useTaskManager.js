import { useState, useEffect } from 'react'
import { taskStorage } from '../storage/taskStorage'
import { generateId } from '../utils/idGenerator'
import { ensureDate, areDatesEqual } from '../utils/dateUtils'

export function useTaskManager() {
  const [tasks, setTasks] = useState(() => taskStorage.load())

  useEffect(() => {
    taskStorage.save(tasks)
  }, [tasks])

  const handleAddTask = (task) => {
    setTasks([...tasks, { 
      ...task, 
      id: generateId(), 
      checked: false,
      date: ensureDate(task.date)
    }])
  }

  const handleDeleteTask = (date, priority, index) => {
    setTasks(prevTasks => 
      prevTasks.filter((task, i) => 
        !(areDatesEqual(task.date, date) && task.priority === priority && i === index)
      )
    )
  }

  const handleChangeTaskPriority = (date, priority, index) => {
    setTasks(prevTasks => 
      prevTasks.map((task, i) => {
        if (areDatesEqual(task.date, date) && task.priority === priority && i === index) {
          return {
            ...task,
            priority: priority === 'high' ? 'low' : 'high'
          }
        }
        return task
      })
    )
  }

  const handleUpdateTaskText = (date, priority, index, newText) => {
    setTasks(prevTasks => 
      prevTasks.map((task, i) => {
        if (areDatesEqual(task.date, date) && task.priority === priority && i === index) {
          return {
            ...task,
            text: newText
          }
        }
        return task
      })
    )
  }

  const handleTasksReorder = (date, priority, newTasks) => {
    setTasks(prevTasks => {
      const otherTasks = prevTasks.filter(task => 
        !areDatesEqual(task.date, date) || task.priority !== priority
      )
      return [...otherTasks, ...newTasks]
    })
  }

  const handleCheckChange = (date, priority, index, checked) => {
    setTasks(prevTasks => 
      prevTasks.map((task, i) => {
        if (areDatesEqual(task.date, date) && task.priority === priority && i === index) {
          return {
            ...task,
            checked
          }
        }
        return task
      })
    )
  }

  return {
    tasks,
    handleAddTask,
    handleDeleteTask,
    handleChangeTaskPriority,
    handleUpdateTaskText,
    handleTasksReorder,
    handleCheckChange
  }
}