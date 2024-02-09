import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from './Header'
import { useToDo } from 'context/TodoContext'

jest.mock('../../context/TodoContext', () => ({
  useToDo: jest.fn(),
}))

describe('Header component', () => {
  it('renders input field and buttons', () => {
    (useToDo as jest.Mock).mockReturnValue({
      inputValue: 'Testing',
    })

    render(<Header />)
    const textInput = screen.getByDisplayValue('Testing')
    expect(textInput).toBeInTheDocument()
    const submitBtn = screen.getByText('Submit')
    expect(submitBtn).toBeInTheDocument()
    const cancelBtn = screen.getByText('Cancel')
    expect(cancelBtn).toBeInTheDocument()
  })

  it('calls handleInputChange when input field value changes', () => {
    const handleInputChangeMock = jest.fn()
    ;(useToDo as jest.Mock).mockReturnValue({
      inputValue: '',
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
      inputValue: 'Testing',
      handleSubmit: handleSubmitMock,
    })

    render(<Header />)
    const submitBtn = screen.getByText('Submit')
    fireEvent.click(submitBtn)
    expect(handleSubmitMock).toHaveBeenCalled()
  })

  it('calls handleKeyDown when "Enter" button is clicked', () => {
    const handleKeyDownMock = jest.fn()
    const useToDoMock = (useToDo as jest.Mock).mockImplementation(() => ({
      handleKeyDown: handleKeyDownMock,
      inputRef: { current: document.createElement('input') },
    }))

    render(<Header />)
    const input = screen.getByPlaceholderText('Enter Todo...')

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(handleKeyDownMock).toHaveBeenCalledTimes(1)

    useToDoMock.mockRestore()
  })
})
