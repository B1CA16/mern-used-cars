import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import CarsPage from './pages/CarsPage'

const App = () => {
  return (
    <div className=''>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cars' element={<CarsPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
