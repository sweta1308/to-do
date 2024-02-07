import React, { createContext, useContext, useState } from 'react'
import {
  InputTypes,
  ToDoContextProps,
  ToDoProviderProps,
  ToDoTypes,
} from './TodoContext.types'

const ToDoContext = createContext<ToDoContextProps>(undefined!)

export const ToDoProvider: React.FC<ToDoProviderProps> = ({ children }) => {
  const [inputState, setInputState] = useState<InputTypes>({
    isInputVisible: false,
    inputValue: '',
  })
  const [toDo, setToDo] = useState<ToDoTypes[]>([])
  const [editId, setEditId] = useState<number>(0)

  const openTodos = toDo.filter(
    ({ status }: { status: string }) => status === 'open',
  )
  const completedTodos = toDo.filter(
    ({ status }: { status: string }) => status === 'completed',
  )

  const handleAddClick = () =>
    setInputState({ ...inputState, isInputVisible: true })

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) =>
    setInputState({ ...inputState, inputValue: e.currentTarget.value })

  const handleSubmit = () => {
    if (inputState.inputValue) {
      if (editId > 0) {
        setToDo((prev) =>
          prev.map((item) =>
            item.id === editId
              ? { ...item, todo: inputState.inputValue }
              : item,
          ),
        )
        setEditId(0)
      } else {
        setToDo([
          { id: toDo.length + 1, todo: inputState.inputValue, status: 'open' },
          ...toDo,
        ])
      }
      setInputState({ inputValue: '', isInputVisible: false })
    } else {
      alert('Add some task in input!')
    }
  }

  const handleCancelClick = () =>
    setInputState({ inputValue: '', isInputVisible: false })

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
    setInputState({ inputValue: item.todo, isInputVisible: true })
    setEditId(item.id)
  }

  const handleDelete = (item: ToDoTypes) => {
    setToDo((prev: ToDoTypes[]) => prev.filter((todo) => todo.id !== item.id))
    setInputState({ inputValue: '', isInputVisible: false })
  }

  const getToDoName = (name: string) =>
    name.length > 40 ? name.substring(0, 40) + '...' : name

  const value = {
    inputState,
    openTodos,
    completedTodos,
    handleAddClick,
    handleInputChange,
    handleSubmit,
    handleCancelClick,
    handleCheckboxChange,
    handleEdit,
    handleDelete,
    getToDoName,
  }
  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>
}

export const useToDo = () => useContext(ToDoContext)
