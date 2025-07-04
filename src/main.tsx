import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home.tsx'
import { BudgetProvider } from './context/budget/BudgetContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BudgetProvider>
      <Home />
    </BudgetProvider>
  </StrictMode>,
)
