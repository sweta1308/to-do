import { useToDo } from '../../context/TodoContext'
import './Button.css'

const Button = () => {
  const {
    inputState,
    handleSubmit,
    handleInputChange,
    handleCancelClick,
    handleAddClick,
  } = useToDo()
  const { isInputVisible, inputValue } = inputState
  return (
    <div data-testid="buttons">
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

export default Button
