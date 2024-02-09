import { DragDropContext } from 'react-beautiful-dnd'
import './Home.css'
import { Header, ToDoList } from 'components'
import { useToDo } from 'context/TodoContext'

const Home = () => {
  const { handleDragEnd } = useToDo()
  return (
    <div className="home">
      <nav id="nav">
        <h1>To Do App</h1>
      </nav>
      <Header />
      <DragDropContext onDragEnd={handleDragEnd}>
        <ToDoList />
      </DragDropContext>
    </div>
  )
}

export default Home
