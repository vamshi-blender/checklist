import { useState, useEffect } from 'react'

export function useDate() {
  const [date, setDate] = useState(() => new Date())

  // Reset to today's date on page load
  useEffect(() => {
    setDate(new Date())
  }, [])

  return [date, setDate]
}