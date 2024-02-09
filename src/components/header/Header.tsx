import { useEffect } from 'react'
import { useToDo } from '../../context/TodoContext'
import './Header.css'

const Header = () => {
  const {
    inputValue,
    handleSubmit,
    handleInputChange,
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
      <button onClick={handleSubmit} className="button">
        Submit
      </button>
    </div>
  )
}

export default Header
