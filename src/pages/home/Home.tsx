import './Home.css'
import { Button, ToDoList } from 'components'

const Home = () => {
  return (
    <div className="home">
      <h1>To Do App</h1>
      <Button />
      <ToDoList />
    </div>
  )
}

export default Home
