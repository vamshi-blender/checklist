import React from 'react'
import { Checkbox } from './ui/checkbox'
import { TaskItemActions } from './TaskItemActions'
import { EditableText } from './EditableText'
import { GripVertical } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function TaskItem({ id, text, checked, onDelete, onStateChange, onTextChange, onCheckChange }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'default'
  }

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="bg-white border border-slate-200 rounded-md p-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <button
            className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 mt-1"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <Checkbox
            checked={checked}
            onCheckedChange={onCheckChange}
            className="mt-0.5"
          />
          <div className={checked ? 'line-through text-slate-400' : ''}>
            <EditableText text={text} onSave={onTextChange} />
          </div>
        </div>
        <TaskItemActions 
          onDelete={onDelete}
          onStateChange={onStateChange}
        />
      </div>
    </div>
  )
}