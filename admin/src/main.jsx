import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from'react-router-dom'
import Zest from './assets/favizest.png'

const link = document.createElement('link')
link.rel = 'icon'
link.type = 'image/png'
link.href = Zest
document.head.appendChild(link)

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
