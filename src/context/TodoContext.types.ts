import React, { ReactNode } from 'react'

type ToDoTypes = {
  id: number
  todo: string
  status: string
}

type InputTypes = {
  isInputVisible: boolean
  inputValue: string
}

type ToDoContextProps = {
  openTodos: ToDoTypes[]
  completedTodos: ToDoTypes[]
  inputState: InputTypes
  handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void
  handleCancelClick: () => void
  handleAddClick: () => void
  handleSubmit: () => void
  handleCheckboxChange: (item: ToDoTypes) => void
  handleEdit: (item: ToDoTypes) => void
  handleDelete: (item: ToDoTypes) => void
  handleDragStart: (index: number) => void
  handleDragOver: (index: number) => void
  handleDragEnd: () => void
}

type ToDoProviderProps = {
  children: ReactNode
}
export type { ToDoTypes, InputTypes, ToDoContextProps, ToDoProviderProps }
