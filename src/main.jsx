import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TrainProvider from './State/TrainContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TrainProvider>
      <App />
    </TrainProvider>
  </StrictMode>,
)
