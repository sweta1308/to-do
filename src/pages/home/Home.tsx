import './Home.css'
import { Header, ToDoList } from 'components'

const Home = () => {
  return (
    <div className="home">
      <h1>To Do App</h1>
      <Header />
      <ToDoList />
    </div>
  )
}

export default Home
