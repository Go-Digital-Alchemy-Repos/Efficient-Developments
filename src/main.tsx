import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import './styles/tokens.css'
import './styles/global.css'
import './styles/components.css'
import './styles/home.css'
import './styles/about.css'
import './styles/service.css'
import './styles/contact.css'
import './styles/projects.css'
import './styles/careers.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
