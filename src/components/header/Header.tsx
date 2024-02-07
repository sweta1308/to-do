import { useToDo } from '../../context/TodoContext'
import './Header.css'

const Header = () => {
  const {
    inputState,
    handleSubmit,
    handleInputChange,
    handleCancelClick,
    handleAddClick,
  } = useToDo()
  const { isInputVisible, inputValue } = inputState
  return (
    <div data-testid="header">
      {isInputVisible ? (
        <div className="inputs">
          <input
            className="text-input"
            value={inputValue}
            onChange={(e) => handleInputChange(e)}
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
      ) : (
        <button onClick={handleAddClick} className="button">
          Add Todo
        </button>
      )}
    </div>
  )
}

export default Header
