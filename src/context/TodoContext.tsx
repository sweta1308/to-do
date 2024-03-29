import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { toast, useToasterStore } from 'react-hot-toast'
import {
  ToDoContextProps,
  ToDoProviderProps,
  ToDoTypes,
} from './TodoContext.types'
import { DropResult } from 'react-beautiful-dnd'

const ToDoContext = createContext<ToDoContextProps>(undefined!)

export const ToDoProvider: React.FC<ToDoProviderProps> = ({ children }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [toDo, setToDo] = useState<ToDoTypes[]>([])
  const [editId, setEditId] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const { toasts } = useToasterStore()

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
        toast('Todo updated successfully!', {
          icon: '✍🏻',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
      } else {
        setToDo([
          { id: toDo.length + 1, todo: inputValue, status: 'open' },
          ...toDo,
        ])
        toast('Todo added successfully!', {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
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

  const handleCheckboxChange = (item: ToDoTypes) => {
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
    toast('Todo updated successfully!', {
      icon: '✍🏻',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  }

  const handleEdit = (item: ToDoTypes) => {
    setInputValue(item.todo)
    setEditId(item.id)
    window.scroll({ top: 0, behavior: 'smooth' })
    inputRef.current?.focus()
  }

  const handleDelete = (item: ToDoTypes) => {
    setToDo((prev: ToDoTypes[]) => prev.filter((todo) => todo.id !== item.id))
    setInputValue('')
    toast('Todo deleted!', {
      icon: '❓',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  }

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result
    if (!destination) return

    const sourceColumn = source.droppableId
    const destinationColumn = destination.droppableId

    if (sourceColumn === destinationColumn) {
      const _arr = [...toDo]
      const newList = _arr.filter(
        (_: ToDoTypes, i: number) => i !== source.index,
      )
      newList.splice(destination.index, 0, _arr[source.index])
      setToDo(newList)
    } else {
      const updatedTodos = toDo.map((todo) =>
        todo.id === Number(draggableId)
          ? {
              ...todo,
              status: todo.status === 'completed' ? 'open' : 'completed',
            }
          : todo,
      )
      setToDo(updatedTodos)
    }
    toast('Todo updated successfully!', {
      icon: '✍🏻',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  }

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= 3)
      .forEach((t) => toast.dismiss(t.id))
  }, [toasts])

  const value = {
    inputValue,
    inputRef,
    openTodos,
    completedTodos,
    handleInputChange,
    handleKeyDown,
    handleSubmit,
    handleCheckboxChange,
    handleEdit,
    handleDelete,
    handleDragEnd,
  }
  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>
}

export const useToDo = () => useContext(ToDoContext)
