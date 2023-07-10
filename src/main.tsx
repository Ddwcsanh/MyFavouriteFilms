import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
        <canvas
          id='canvas'
          style={{ display: window.location.pathname !== ('/login' || '/test') ? 'none' : '' }}
        ></canvas>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
