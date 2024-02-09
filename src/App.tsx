import { Toaster } from 'react-hot-toast'
import Home from 'pages/home/Home'
import './App.css'

function App() {
  return (
    <div className="App">
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: '1rem',
          right: '1rem',
          fontSize: '0.9rem',
        }}
      />
      <Home />
    </div>
  )
}

export default App
