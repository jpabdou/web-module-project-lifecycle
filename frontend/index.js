import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import './styles/reset.css'
import './styles/styles.css'

render(
  <React.StrictMode>
    <h1>Todo App AJAX</h1>
    <h2>Instructions: Click on a Todo to mark them as "completed" with an "X" mark. You can delete individual todos or hide all completed todos with the corresponding buttons. Add new todos and submit them with the form at the bottom.</h2>
    <App />
  </React.StrictMode>
  , document.getElementById('root')
)
