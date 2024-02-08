import React, { ReactNode } from 'react'

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
  handleCancelClick: () => void
  handleSubmit: () => void
  handleCheckboxChange: (item: ToDoTypes) => void
  handleEdit: (item: ToDoTypes) => void
  handleDelete: (item: ToDoTypes) => void
  handleDragStart: (index: number) => void
  handleDragOver: (index: number) => void
  handleDrop: () => void
}

type ToDoProviderProps = {
  children: ReactNode
}
export type { ToDoTypes, ToDoContextProps, ToDoProviderProps }
