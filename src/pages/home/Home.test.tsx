import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from './Home'
import { ToDoProvider } from 'context/TodoContext'

it('should render Home component', () => {
  render(
    <ToDoProvider>
      <Home />
    </ToDoProvider>,
  )
  const heading = screen.getByText('To Do App')
  expect(heading).toBeInTheDocument()
  const header = screen.getByTestId('header')
  expect(header).toBeInTheDocument()
  const toDoList = screen.getByTestId('todo-list')
  expect(toDoList).toBeInTheDocument()
})
