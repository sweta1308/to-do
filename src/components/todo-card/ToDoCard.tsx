import { useToDo } from 'context/TodoContext'
import './ToDoCard.css'
import { ToDoTypes } from 'context/TodoContext.types'

const ToDoCard = ({ item }: { item: ToDoTypes }) => {
  const { handleCheckboxChange, handleEdit, handleDelete, getToDoName } =
    useToDo()
  return (
    <li
      key={item.id}
      className={`${item.status === 'completed' && 'completed-item'}`}
    >
      <input
        type="checkbox"
        checked={item.status === 'completed'}
        onChange={() => handleCheckboxChange(item)}
      />
      <div className="card-body">
        <div
          className={`todo-head ${item.status === 'completed' && 'head-line'}`}
        >
          {getToDoName(item.todo)}
        </div>
        <div className="buttons">
          <button onClick={() => handleEdit(item)} className="edit">
            Edit
          </button>
          <button onClick={() => handleDelete(item)} className="delete">
            Delete
          </button>
        </div>
      </div>
    </li>
  )
}

export default ToDoCard
