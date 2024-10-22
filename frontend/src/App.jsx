import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import CarsPage from './pages/CarsPage'
import CarAdPAge from './components/CarAdPAge'
import NotExist from './pages/NotExist'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotExist />} />
        <Route path='/cars' element={<CarsPage />} />
        <Route path='/car/:id' element={<CarAdPAge />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
