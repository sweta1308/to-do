import { useEffect } from 'react'
import { useToDo } from '../../context/TodoContext'
import './Header.css'

const Header = () => {
  const {
    inputValue,
    handleSubmit,
    handleInputChange,
    handleCancelClick,
    handleKeyDown,
    inputRef,
  } = useToDo()

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  return (
    <div className="inputs" data-testid="header">
      <input
        ref={inputRef}
        placeholder="Enter Todo..."
        className="text-input"
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <div>
        <button onClick={handleSubmit} className="button">
          Submit
        </button>
        <button onClick={handleCancelClick} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  )
}

export default Header
