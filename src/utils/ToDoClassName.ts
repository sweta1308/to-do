import { ToDoTypes } from 'context/TodoContext.types'

export const completedTodo = (item: ToDoTypes) => {
  const classNames = {
    listClassName: '',
    headClassName: '',
    isCompleted: false,
  }
  if (item.status === 'completed') {
    classNames.listClassName = 'completed-item'
    classNames.headClassName = 'head-line'
    classNames.isCompleted = true
  }

  return classNames
}
