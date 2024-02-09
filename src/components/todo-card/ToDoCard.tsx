import { useToDo } from 'context/TodoContext'
import './ToDoCard.css'
import { ToDoTypes } from 'context/TodoContext.types'
import { completedTodo } from 'utils/ToDoClassName'
import { getToDoName } from 'utils/GetName'
import { Draggable } from 'react-beautiful-dnd'

const ToDoCard = ({ item, index }: { item: ToDoTypes; index: number }) => {
  const { handleCheckboxChange, handleEdit, handleDelete } = useToDo()
  const { listClassName, headClassName, isCompleted } = completedTodo(item)
  const todoName = getToDoName(item.todo)
  return (
    <Draggable draggableId={item.id.toString()} index={index} key={item.id}>
      {(provided) => (
        <li
          key={item.id}
          className={`${listClassName}`}
          data-testid="todo-card"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => handleCheckboxChange(item)}
          />
          <div className="card-body">
            <div className={`todo-head ${headClassName}`}>{todoName}</div>
            {!isCompleted && (
              <div className="buttons">
                <button onClick={() => handleEdit(item)} className="edit">
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <button onClick={() => handleDelete(item)} className="delete">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            )}
          </div>
        </li>
      )}
    </Draggable>
  )
}

export default ToDoCard
