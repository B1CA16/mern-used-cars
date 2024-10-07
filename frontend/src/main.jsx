import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SearchProvider } from './context/SearchContext.jsx'
import { CarProvider } from './context/CarContext.jsx' 

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SearchProvider>
      <CarProvider>  
        <App />
      </CarProvider>
    </SearchProvider>
  </BrowserRouter>
)
