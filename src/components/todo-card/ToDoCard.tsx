import { useToDo } from 'context/TodoContext'
import './ToDoCard.css'
import { ToDoTypes } from 'context/TodoContext.types'

const ToDoCard = ({ item }: { item: ToDoTypes }) => {
  const { setToDo, setInputState, setEditId } = useToDo()

  const handleChange = () =>
    setToDo((prev: ToDoTypes[]) =>
      prev.map((todo) =>
        todo.id === item.id
          ? {
              ...todo,
              status: todo.status === 'open' ? 'completed' : 'open',
            }
          : todo,
      ),
    )

  const handleEdit = () => {
    setInputState({ inputValue: item.todo, isInputVisible: true })
    setEditId(item.id)
  }

  const handleDelete = () => {
    setToDo((prev: ToDoTypes[]) => prev.filter((todo) => todo.id !== item.id))
    setInputState({ inputValue: '', isInputVisible: false })
  }
  return (
    <li
      key={item.id}
      className={`${item.status === 'completed' && 'completed-item'}`}
    >
      <input
        type="checkbox"
        checked={item.status === 'completed'}
        onChange={handleChange}
      />
      <div className="card-body">
        <div
          className="todo-head"
          style={{
            textDecoration: item.status === 'completed' ? 'line-through' : '',
          }}
        >
          {item.todo.length > 40
            ? item.todo.substring(0, 40) + '...'
            : item.todo}
        </div>
        <div className="buttons">
          <button onClick={handleEdit} className="edit">
            Edit
          </button>
          <button onClick={handleDelete} className="delete">
            Delete
          </button>
        </div>
      </div>
    </li>
  )
}

export default ToDoCard
