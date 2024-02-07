import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ToDoProvider } from 'context/TodoContext'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <ToDoProvider>
      <App />
    </ToDoProvider>
  </React.StrictMode>,
)
