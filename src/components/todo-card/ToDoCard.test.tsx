import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ToDoCard from './ToDoCard'
import { useToDo } from 'context/TodoContext'

jest.mock('context/TodoContext', () => ({
  useToDo: jest.fn(),
}))

describe('ToDoCard component', () => {
  beforeEach(() => {
    (useToDo as jest.Mock).mockReturnValue({
      handleCheckboxChange: jest.fn(),
      handleEdit: jest.fn(),
      handleDelete: jest.fn(),
      handleDragStart: jest.fn(),
      handleDragOver: jest.fn(),
      handleDrop: jest.fn(),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const testItem = {
    id: 1,
    status: 'open',
    todo: 'Test Item',
  }

  it('renders ToDoCard component', () => {
    render(<ToDoCard item={testItem} index={0} />)
    const toDoText = screen.getByText('Test Item')
    expect(toDoText).toBeInTheDocument()
    const editBtn = screen.getByText('Edit')
    expect(editBtn).toBeInTheDocument()
    const deleteBtn = screen.getByText('Delete')
    expect(deleteBtn).toBeInTheDocument()
  })

  it('calls handleCheckboxChange when checkbox is clicked', () => {
    const handleCheckboxChangeMock = jest.fn()
    ;(useToDo as jest.Mock).mockReturnValue({
      handleCheckboxChange: handleCheckboxChangeMock,
    })
    render(<ToDoCard item={testItem} index={0} />)
    const checkboxInput = screen.getByRole('checkbox')
    fireEvent.click(checkboxInput)
    expect(handleCheckboxChangeMock).toHaveBeenCalledWith(testItem)
  })

  it('calls handleEdit when Edit button is clicked', () => {
    const handleEditMock = jest.fn()
    ;(useToDo as jest.Mock).mockReturnValue({
      handleEdit: handleEditMock,
    })
    render(<ToDoCard item={testItem} index={0} />)
    const editBtn = screen.getByText('Edit')
    fireEvent.click(editBtn)
    expect(handleEditMock).toHaveBeenCalledWith(testItem)
  })

  it('calls handleDelete when Delete button is clicked', () => {
    const handleDeleteMock = jest.fn()
    ;(useToDo as jest.Mock).mockReturnValue({
      handleDelete: handleDeleteMock,
    })
    render(<ToDoCard item={testItem} index={0} />)
    const deleteBtn = screen.getByText('Delete')
    fireEvent.click(deleteBtn)
    expect(handleDeleteMock).toHaveBeenCalledWith(testItem)
  })
})
