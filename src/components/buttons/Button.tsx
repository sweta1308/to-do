import { useToDo } from '../../context/TodoContext'
import './Button.css'

const Button = () => {
  const { inputState, setInputState, handleSubmit } = useToDo()
  const { isInputVisible, inputValue } = inputState
  return (
    <div data-testid="buttons">
      {isInputVisible ? (
        <div className="inputs">
          <input
            className="text-input"
            value={inputValue}
            onChange={(e) =>
              setInputState({ ...inputState, inputValue: e.target.value })
            }
          />
          <div>
            <button onClick={handleSubmit} className="button">
              Submit
            </button>
            <button
              onClick={() =>
                setInputState({ inputValue: '', isInputVisible: false })
              }
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setInputState({ ...inputState, isInputVisible: true })}
          className="button"
        >
          Add Todo
        </button>
      )}
    </div>
  )
}

export default Button
