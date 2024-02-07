import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from './Header'
import { useToDo } from 'context/TodoContext'

jest.mock('../../context/TodoContext', () => ({
  useToDo: jest.fn(),
}))

describe('Header component', () => {
  it('renders input field and buttons when isInputVisible is true', () => {
    (useToDo as jest.Mock).mockReturnValue({
      inputState: { isInputVisible: true, inputValue: 'Testing' },
    })

    render(<Header />)
    const textInput = screen.getByDisplayValue('Testing')
    expect(textInput).toBeInTheDocument()
    const submitBtn = screen.getByText('Submit')
    expect(submitBtn).toBeInTheDocument()
    const cancelBtn = screen.getByText('Cancel')
    expect(cancelBtn).toBeInTheDocument()
  })

  it('renders Add Todo button when isInputVisible is false', () => {
    (useToDo as jest.Mock).mockReturnValue({
      inputState: { isInputVisible: false },
    })

    render(<Header />)
    const addBtn = screen.getByText('Add Todo')
    expect(addBtn).toBeInTheDocument()
  })

  it('calls handleAddClick when "Add Todo" button is clicked', () => {
    const handleAddClickMock = jest.fn()
    ;(useToDo as jest.Mock).mockReturnValue({
      inputState: { isInputVisible: false },
      handleAddClick: handleAddClickMock,
    })

    render(<Header />)
    const addBtn = screen.getByText('Add Todo')
    fireEvent.click(addBtn)
    expect(handleAddClickMock).toHaveBeenCalled()
  })

  it('calls handleInputChange when input field value changes', () => {
    const handleInputChangeMock = jest.fn()
    ;(useToDo as jest.Mock).mockReturnValue({
      inputState: { isInputVisible: true, inputValue: '' },
      handleInputChange: handleInputChangeMock,
    })

    render(<Header />)
    const inputField = screen.getByPlaceholderText('Enter Todo...')
    fireEvent.change(inputField, { target: { value: 'Testing' } })
    expect(handleInputChangeMock).toHaveBeenCalled()
  })

  it('calls handleSubmit when "Submit" button is clicked', () => {
    const handleSubmitMock = jest.fn()
    ;(useToDo as jest.Mock).mockReturnValue({
      inputState: { isInputVisible: true, inputValue: 'Testing' },
      handleSubmit: handleSubmitMock,
    })

    render(<Header />)
    const submitBtn = screen.getByText('Submit')
    fireEvent.click(submitBtn)
    expect(handleSubmitMock).toHaveBeenCalled()
  })

  it('calls handleCancelClick when "Cancel" button is clicked', () => {
    const handleCancelClickMock = jest.fn()
    ;(useToDo as jest.Mock).mockReturnValue({
      inputState: { isInputVisible: true },
      handleCancelClick: handleCancelClickMock,
    })

    render(<Header />)
    const cancelBtn = screen.getByText('Cancel')
    fireEvent.click(cancelBtn)
    expect(handleCancelClickMock).toHaveBeenCalled()
  })
})
