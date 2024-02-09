import React, { ReactNode } from 'react'
import { DropResult } from 'react-beautiful-dnd'

type ToDoTypes = {
  id: number
  todo: string
  status: string
}

type ToDoContextProps = {
  inputValue: string
  inputRef: React.RefObject<HTMLInputElement>
  openTodos: ToDoTypes[]
  completedTodos: ToDoTypes[]
  handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleSubmit: () => void
  handleCheckboxChange: (item: ToDoTypes) => void
  handleEdit: (item: ToDoTypes) => void
  handleDelete: (item: ToDoTypes) => void
  dragEnded: (result: DropResult) => void
}

type ToDoProviderProps = {
  children: ReactNode
}
export type { ToDoTypes, ToDoContextProps, ToDoProviderProps }
