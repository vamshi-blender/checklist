import React from 'react'
import { Play, Trash2, ArrowDownUp } from 'lucide-react'

export function TaskItemActions({ onDelete, onStateChange }) {
  return (
    <div className="flex items-center gap-2">
      <button className="text-slate-400 hover:text-slate-600 transition-colors">
        <Play className="h-4 w-4" />
      </button>
      <button 
        onClick={onDelete}
        className="text-slate-400 hover:text-red-600 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      <button 
        onClick={onStateChange}
        className="text-slate-400 hover:text-[#1b4fd8] transition-colors"
      >
        <ArrowDownUp className="h-4 w-4" />
      </button>
    </div>
  )
}