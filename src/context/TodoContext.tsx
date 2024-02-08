import React, { createContext, useContext, useRef, useState } from 'react'
import {
  ToDoContextProps,
  ToDoProviderProps,
  ToDoTypes,
} from './TodoContext.types'

const ToDoContext = createContext<ToDoContextProps>(undefined!)

export const ToDoProvider: React.FC<ToDoProviderProps> = ({ children }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [toDo, setToDo] = useState<ToDoTypes[]>([])
  const [editId, setEditId] = useState<number>(0)
  const [draggedItem, setDraggedItem] = useState<ToDoTypes>(null!)
  const inputRef = useRef<HTMLInputElement>(null)

  const openTodos = toDo.filter(
    ({ status }: { status: string }) => status === 'open',
  )
  const completedTodos = toDo.filter(
    ({ status }: { status: string }) => status === 'completed',
  )

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) =>
    setInputValue(e.currentTarget.value)

  const handleSubmit = () => {
    if (inputValue) {
      if (editId > 0) {
        setToDo((prev) =>
          prev.map((item) =>
            item.id === editId ? { ...item, todo: inputValue } : item,
          ),
        )
        setEditId(0)
      } else {
        setToDo([
          { id: toDo.length + 1, todo: inputValue, status: 'open' },
          ...toDo,
        ])
      }
      setInputValue('')
    } else {
      alert('Add some task in input!')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleCancelClick = () => setInputValue('')

  const handleCheckboxChange = (item: ToDoTypes) =>
    setToDo((prev: ToDoTypes[]) =>
      prev.map((todo) =>
        todo.id === item.id
          ? {
              ...todo,
              status: todo.status === 'open' ? 'completed' : 'open',
            }
          : todo,
      ),
    )

  const handleEdit = (item: ToDoTypes) => {
    setInputValue(item.todo)
    setEditId(item.id)
    window.scroll({ top: 0, behavior: 'smooth' })
    inputRef.current?.focus()
  }

  const handleDelete = (item: ToDoTypes) => {
    setToDo((prev: ToDoTypes[]) => prev.filter((todo) => todo.id !== item.id))
    setInputValue('')
  }

  const handleDragStart = (index: number) => {
    setDraggedItem(toDo[index])
  }

  const handleDragOver = (index: number) => {
    const items = toDo.filter((item) => item !== draggedItem)
    items.splice(index, 0, draggedItem)
    setToDo(items)
  }

  const handleDrop = () => {
    setDraggedItem(null!)
  }

  const value = {
    inputValue,
    inputRef,
    openTodos,
    completedTodos,
    handleInputChange,
    handleKeyDown,
    handleSubmit,
    handleCancelClick,
    handleCheckboxChange,
    handleEdit,
    handleDelete,
    handleDragStart,
    handleDragOver,
    handleDrop,
  }
  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>
}

export const useToDo = () => useContext(ToDoContext)
