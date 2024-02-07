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

  const value = {
    toDo,
    setToDo,
    inputState,
    setInputState,
    handleSubmit,
    setEditId,
  }
  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>
}

export const useToDo = () => useContext(ToDoContext)
