import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ToDoProvider, useToDo } from './TodoContext'

describe('ToDoProvider', () => {
  it('adds a new todo', () => {
    const TestComponent = () => {
      const { inputValue, handleInputChange, handleSubmit } = useToDo()
      return (
        <div>
          <input type="text" value={inputValue} onChange={handleInputChange} />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )
    }

    render(
      <ToDoProvider>
        <TestComponent />
      </ToDoProvider>,
    )

    const input = screen.getByRole('textbox')
    const submitBtn = screen.getByText('Submit')

    fireEvent.change(input, { target: { value: 'Test Todo' } })
    fireEvent.click(submitBtn)

    expect(input).toHaveValue('')
  })

  it('deletes a todo', () => {
    const TestComponent = () => {
      const { handleDelete } = useToDo()
      const todos = [{ id: 1, todo: 'Todo 1', status: 'open' }]

      return (
        <div>
          {todos.map((todo) => (
            <div key={todo.id}>
              {todo.todo}
              <button onClick={() => handleDelete(todo)}>Delete</button>
            </div>
          ))}
        </div>
      )
    }

    render(
      <ToDoProvider>
        <TestComponent />
      </ToDoProvider>,
    )

    const deleteBtn = screen.getByText('Delete')

    fireEvent.click(deleteBtn)
  })

  it('toggles todo status', () => {
    const TestComponent = () => {
      const { handleCheckboxChange } = useToDo()
      const todos = [{ id: 1, todo: 'Todo 1', status: 'open' }]

      return (
        <div>
          {todos.map((todo) => (
            <div key={todo.id}>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(todo)}
              />
              <div>{todo.todo}</div>
              <div>{todo.status}</div>
            </div>
          ))}
        </div>
      )
    }

    render(
      <ToDoProvider>
        <TestComponent />
      </ToDoProvider>,
    )

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
  })

  it('edits a todo', () => {
    const TestComponent = () => {
      const { inputValue, handleInputChange, handleSubmit, handleEdit } =
        useToDo()
      const todos = [{ id: 1, todo: 'Todo 1', status: 'open' }]

      return (
        <div>
          <div>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
          {todos.map((todo) => (
            <div key={todo.id}>
              <div>{todo.todo}</div>
              <button onClick={() => handleEdit(todo)}>Edit</button>
            </div>
          ))}
        </div>
      )
    }

    render(
      <ToDoProvider>
        <TestComponent />
      </ToDoProvider>,
    )

    const editButton = screen.getByText('Edit')
    fireEvent.click(editButton)

    const input = screen.getByDisplayValue('Todo 1')
    fireEvent.change(input, { target: { value: 'Edited Todo' } })

    fireEvent.click(screen.getByText('Submit'))
  })
})
