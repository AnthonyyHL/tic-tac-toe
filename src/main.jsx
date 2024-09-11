import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import UsersInput from './user_input/UsersInput.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsersInput />
    <App />
  </StrictMode>,
)
