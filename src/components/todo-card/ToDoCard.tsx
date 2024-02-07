import { useToDo } from 'context/TodoContext'
import './ToDoCard.css'
import { ToDoTypes } from 'context/TodoContext.types'
import { completedTodo } from 'utils/ToDoClassName'
import { getToDoName } from 'utils/GetName'

const ToDoCard = ({ item, index }: { item: ToDoTypes; index: number }) => {
  const {
    handleCheckboxChange,
    handleEdit,
    handleDelete,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useToDo()
  const { listClassName, headClassName, isCompleted } = completedTodo(item)
  const todoName = getToDoName(item.todo)
  return (
    <li
      onDragStart={() => handleDragStart(index)}
      onDragOver={() => handleDragOver(index)}
      onDragEnd={handleDragEnd}
      draggable
      key={item.id}
      className={`${listClassName}`}
      data-testid="todo-card"
    >
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => handleCheckboxChange(item)}
      />
      <div className="card-body">
        <div className={`todo-head ${headClassName}`}>{todoName}</div>
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
