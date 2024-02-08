import { useToDo } from 'context/TodoContext'
import './ToDoList.css'
import ToDoCard from 'components/todo-card/ToDoCard'
import { ToDoTypes } from 'context/TodoContext.types'
import { Droppable } from 'react-beautiful-dnd'

const ToDoList = () => {
  const { openTodos, completedTodos } = useToDo()
  return (
    <div className="todo-list" data-testid="todo-list">
      <div className="column">
        <h2 className="open">Open Todos</h2>
        {openTodos.length === 0 ? (
          <h3>No Open Todos.</h3>
        ) : (
          <Droppable droppableId="open">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {openTodos.map((item: ToDoTypes, i: number) => (
                  <ToDoCard item={item} index={i} />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        )}
      </div>
      <div className="column">
        <h2 className="completed">Completed Todos</h2>
        {completedTodos.length === 0 ? (
          <h3>No Completed Todos.</h3>
        ) : (
          <Droppable droppableId="completed">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {completedTodos.map((item: ToDoTypes, i: number) => (
                  <ToDoCard item={item} index={i} />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        )}
      </div>
    </div>
  )
}

export default ToDoList
