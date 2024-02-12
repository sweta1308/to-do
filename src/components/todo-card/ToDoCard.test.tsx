import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ToDoCard from './ToDoCard'
import { useToDo } from 'context/TodoContext'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

jest.mock('../../context/TodoContext', () => ({
  useToDo: jest.fn(() => ({
    handleInputChange: jest.fn(),
    handleKeyDown: jest.fn(),
    handleSubmit: jest.fn(),
    handleDragEnd: jest.fn(),
    handleCheckboxChange: jest.fn(),
    handleEdit: jest.fn(),
    handleDelete: jest.fn(),
  })),
}))

describe('ToDoCard component', () => {
  const testItem = {
    id: 1,
    status: 'open',
    todo: 'Test Item',
  }

  it('renders ToDoCard component', () => {
    const handleDragEndMock = jest.fn()
    ;(useToDo as jest.Mock).mockReturnValue({
      handleDragEnd: handleDragEndMock,
    })
    render(
      <DragDropContext onDragEnd={handleDragEndMock}>
        <Droppable droppableId="open">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ToDoCard item={testItem} index={0} />
            </div>
          )}
        </Droppable>
      </DragDropContext>,
    )
    const toDoText = screen.getByText('Test Item')
    expect(toDoText).toBeInTheDocument()
    const editBtn = screen.getByTestId('edit')
    expect(editBtn).toBeInTheDocument()
    const deleteBtn = screen.getByTestId('delete')
    expect(deleteBtn).toBeInTheDocument()
  })

  it('calls handleCheckboxChange when checkbox is clicked', () => {
    const handleCheckboxChangeMock = jest.fn()
    const handleDragEndMock = jest.fn()
    ;(useToDo as jest.Mock).mockReturnValue({
      handleCheckboxChange: handleCheckboxChangeMock,
      handleDragEnd: handleDragEndMock,
    })
    render(
      <DragDropContext onDragEnd={handleDragEndMock}>
        <Droppable droppableId="open">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ToDoCard item={testItem} index={0} />
            </div>
          )}
        </Droppable>
      </DragDropContext>,
    )
    const checkboxInput = screen.getByRole('checkbox')
    fireEvent.click(checkboxInput)
    expect(handleCheckboxChangeMock).toHaveBeenCalledWith(testItem)
  })

  it('calls handleEdit when Edit button is clicked', () => {
    const handleEditMock = jest.fn()
    const handleDragEndMock = jest.fn()
    ;(useToDo as jest.Mock).mockReturnValue({
      handleEdit: handleEditMock,
      handleDragEnd: handleDragEndMock,
    })
    render(
      <DragDropContext onDragEnd={handleDragEndMock}>
        <Droppable droppableId="open">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ToDoCard item={testItem} index={0} />
            </div>
          )}
        </Droppable>
      </DragDropContext>,
    )
    const editBtn = screen.getByTestId('edit')
    fireEvent.click(editBtn)
    expect(handleEditMock).toHaveBeenCalledWith(testItem)
  })

  it('calls handleDelete when Delete button is clicked', () => {
    const handleDeleteMock = jest.fn()
    const handleDragEndMock = jest.fn()
    ;(useToDo as jest.Mock).mockReturnValue({
      handleDelete: handleDeleteMock,
      handleDragEnd: handleDragEndMock,
    })
    render(
      <DragDropContext onDragEnd={handleDragEndMock}>
        <Droppable droppableId="open">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ToDoCard item={testItem} index={0} />
            </div>
          )}
        </Droppable>
      </DragDropContext>,
    )
    const deleteBtn = screen.getByTestId('delete')
    fireEvent.click(deleteBtn)
    expect(handleDeleteMock).toHaveBeenCalledWith(testItem)
  })
})
