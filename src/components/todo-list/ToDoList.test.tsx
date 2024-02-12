import { render, screen } from '@testing-library/react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import '@testing-library/jest-dom'
import ToDoList from './ToDoList'
import { useToDo } from 'context/TodoContext'

jest.mock('../../context/TodoContext', () => ({
  useToDo: jest.fn(() => ({
    openTodos: [
      { id: 1, todo: 'Open Todo 1', status: 'open' },
      { id: 2, todo: 'Open Todo 2', status: 'open' },
    ],
    completedTodos: [
      { id: 3, todo: 'Completed Todo 1', status: 'completed' },
      { id: 4, todo: 'Completed Todo 2', status: 'completed' },
      { id: 5, todo: 'Completed Todo 3', status: 'completed' },
    ],
  })),
}))

describe('ToDoList Component', () => {
  it('renders open and completed todos correctly', () => {
    const dragEnd = (result: DropResult) => console.log(result)
    render(
      <DragDropContext onDragEnd={dragEnd}>
        <ToDoList />
      </DragDropContext>,
    )

    expect(screen.getByText('Open Todos')).toBeInTheDocument()
    expect(screen.getByText('Open Todo 1')).toBeInTheDocument()
    expect(screen.getByText('Open Todo 2')).toBeInTheDocument()

    expect(screen.getByText('Completed Todos')).toBeInTheDocument()
    expect(screen.getByText('Completed Todo 1')).toBeInTheDocument()
    expect(screen.getByText('Completed Todo 2')).toBeInTheDocument()
    expect(screen.getByText('Completed Todo 3')).toBeInTheDocument()
  })

  it('displays "No Open Todos." message when there are no open todos', () => {
    (useToDo as jest.Mock).mockReturnValue({
      openTodos: [],
      completedTodos: [
        { id: 1, todo: 'Completed Todo 1', status: 'completed' },
        { id: 2, todo: 'Completed Todo 2', status: 'completed' },
        { id: 3, todo: 'Completed Todo 3', status: 'completed' },
      ],
    })

    const dragEnd = (result: DropResult) => console.log(result)
    render(
      <DragDropContext onDragEnd={dragEnd}>
        <ToDoList />
      </DragDropContext>,
    )

    expect(screen.getByText('No Open Todos.')).toBeInTheDocument()
  })

  it('displays "No Completed Todos." message when there are no completed todos', () => {
    (useToDo as jest.Mock).mockReturnValue({
      openTodos: [
        { id: 1, todo: 'Open Todo 1', status: 'open' },
        { id: 2, todo: 'Open Todo 2', status: 'open' },
        { id: 3, todo: 'Open Todo 3', status: 'open' },
      ],
      completedTodos: [],
    })

    const dragEnd = (result: DropResult) => console.log(result)
    render(
      <DragDropContext onDragEnd={dragEnd}>
        <ToDoList />
      </DragDropContext>,
    )

    expect(screen.getByText('No Completed Todos.')).toBeInTheDocument()
  })
})
