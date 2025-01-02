import { isValid } from 'date-fns'

export function groupTasksByDate(tasks) {
  // First, group tasks by date
  const groupedTasks = tasks.reduce((acc, task) => {
    const taskDate = task.date instanceof Date ? task.date : new Date(task.date)
    
    if (!isValid(taskDate)) {
      console.error('Invalid date found:', task.date)
      return acc
    }

    const dateKey = taskDate.toISOString()
    
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: taskDate,
        highPriority: [],
        lowPriority: []
      }
    }
    
    if (task.priority === 'high') {
      acc[dateKey].highPriority.push(task)
    } else {
      acc[dateKey].lowPriority.push(task)
    }
    
    return acc
  }, {})

  // Convert to array and sort by date (latest first)
  return Object.values(groupedTasks).sort((a, b) => b.date.getTime() - a.date.getTime())
}