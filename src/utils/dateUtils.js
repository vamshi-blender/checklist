import { isValid, parseISO } from 'date-fns'

export function ensureDate(date) {
  if (date instanceof Date) {
    return isValid(date) ? date : new Date()
  }
  
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date)
    return isValid(parsedDate) ? parsedDate : new Date()
  } catch {
    return new Date()
  }
}

export function areDatesEqual(date1, date2) {
  const d1 = ensureDate(date1)
  const d2 = ensureDate(date2)
  return d1.getTime() === d2.getTime()
}