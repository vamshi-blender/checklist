import { STORAGE_KEYS } from './constants'
import { ensureDate } from '../utils/dateUtils'

export const taskStorage = {
  save: (tasks) => {
    try {
      const serializedTasks = tasks.map(task => ({
        ...task,
        date: task.date.toISOString()
      }))
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(serializedTasks))
      return true
    } catch (error) {
      console.error('Error saving tasks:', error)
      return false
    }
  },

  load: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASKS)
      if (!data) return []
      
      const tasks = JSON.parse(data)
      return tasks.map(task => ({
        ...task,
        date: ensureDate(task.date),
        id: task.id || generateId()
      }))
    } catch (error) {
      console.error('Error loading tasks:', error)
      return []
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.TASKS)
      return true
    } catch (error) {
      console.error('Error clearing tasks:', error)
      return false
    }
  }
}