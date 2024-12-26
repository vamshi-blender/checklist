import React, { useState, useRef, useEffect } from 'react'

export function EditableText({ text, onSave }) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(text)
  const inputRef = useRef(null)

  // Sync local state with prop
  useEffect(() => {
    setValue(text)
  }, [text])

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  const handleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (value.trim() !== text) {
      onSave(value.trim())
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (value.trim() !== text) {
        onSave(value.trim())
      }
      setIsEditing(false)
    }
    if (e.key === 'Escape') {
      setValue(text)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent text-sm text-slate-700 focus:outline-none"
      />
    )
  }

  return (
    <div 
      onClick={handleClick}
      className="text-sm text-slate-700 cursor-text"
    >
      {text}
    </div>
  )
}