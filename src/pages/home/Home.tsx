import { DragDropContext } from 'react-beautiful-dnd'
import './Home.css'
import { Header, ToDoList } from 'components'
import { useToDo } from 'context/TodoContext'

const Home = () => {
  const { dragEnded } = useToDo()
  return (
    <div className="home">
      <h1>To Do App</h1>
      <Header />
      <DragDropContext onDragEnd={dragEnded}>
        <ToDoList />
      </DragDropContext>
    </div>
  )
}

export default Home
