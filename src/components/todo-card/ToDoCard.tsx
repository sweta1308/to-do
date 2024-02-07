import { useToDo } from 'context/TodoContext'
import './ToDoCard.css'
import { ToDoTypes } from 'context/TodoContext.types'
import { completedTodo } from 'utils/ToDoClassName'

const ToDoCard = ({ item, index }: { item: ToDoTypes; index: number }) => {
  const {
    handleCheckboxChange,
    handleEdit,
    handleDelete,
    getToDoName,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useToDo()
  const { listClassName, headClassName, isCompleted } = completedTodo(item)
  return (
    <li
      onDragStart={() => handleDragStart(index)}
      onDragOver={() => handleDragOver(index)}
      onDragEnd={handleDragEnd}
      draggable
      key={item.id}
      className={`${listClassName}`}
    >
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => handleCheckboxChange(item)}
      />
      <div className="card-body">
        <div className={`todo-head ${headClassName}`}>
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
