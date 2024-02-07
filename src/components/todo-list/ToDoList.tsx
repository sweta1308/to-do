import { useToDo } from 'context/TodoContext'
import './ToDoList.css'
import ToDoCard from 'components/todo-card/ToDoCard'
import { ToDoTypes } from 'context/TodoContext.types'

const ToDoList = () => {
  const { openTodos, completedTodos } = useToDo()
  return (
    <div className="todo-list" data-testid="todo-list">
      <div className="column">
        <h2 className="open">Open Todos</h2>
        {openTodos.length === 0 ? (
          <h3>No Open Todos.</h3>
        ) : (
          <ul>
            {openTodos.map((item: ToDoTypes, i: number) => (
              <ToDoCard item={item} index={i} />
            ))}
          </ul>
        )}
      </div>
      <div className="column">
        <h2 className="completed">Completed Todos</h2>
        {completedTodos.length === 0 ? (
          <h3>No Completed Todos.</h3>
        ) : (
          <ul>
            {completedTodos.map((item: ToDoTypes, i: number) => (
              <ToDoCard item={item} index={i} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ToDoList
