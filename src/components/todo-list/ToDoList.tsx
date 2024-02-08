import { useToDo } from 'context/TodoContext'
import './ToDoList.css'
import ToDoCard from 'components/todo-card/ToDoCard'
import { ToDoTypes } from 'context/TodoContext.types'
import { Droppable } from 'react-beautiful-dnd'

const ToDoList = () => {
  const { openTodos, completedTodos } = useToDo()
  return (
    <div className="todo-list" data-testid="todo-list">
      <Droppable droppableId="open">
        {(provided) => (
          <div
            className="column"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h2 className="open">Open Todos</h2>

            <div>
              {openTodos.length === 0 ? (
                <h3>No Open Todos.</h3>
              ) : (
                <ul>
                  {openTodos.map((item: ToDoTypes, i: number) => (
                    <ToDoCard item={item} index={i} />
                  ))}
                </ul>
              )}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
      <Droppable droppableId="completed">
        {(provided) => (
          <div
            className="column"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h2 className="completed">Completed Todos</h2>

            <div>
              {completedTodos.length === 0 ? (
                <h3>No Completed Todos.</h3>
              ) : (
                <ul>
                  {completedTodos.map((item: ToDoTypes, i: number) => (
                    <ToDoCard item={item} index={i} />
                  ))}
                </ul>
              )}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default ToDoList
