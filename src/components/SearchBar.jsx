import React from 'react'
import { Input } from './ui/input'

export function SearchBar() {
  return (
    <div>
      <Input 
        type="text"
        placeholder="Search..."
        className="shadow-sm w-full"
      />
    </div>
  )
}