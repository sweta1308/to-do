import { Dispatch, ReactNode, SetStateAction } from 'react'

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
  toDo: ToDoTypes[]
  setToDo: Dispatch<SetStateAction<ToDoTypes[]>>
  inputState: InputTypes
  setInputState: Dispatch<SetStateAction<InputTypes>>
  handleSubmit: () => void
  setEditId: Dispatch<SetStateAction<number>>
}

type ToDoProviderProps = {
  children: ReactNode
}
export type { ToDoTypes, InputTypes, ToDoContextProps, ToDoProviderProps }
