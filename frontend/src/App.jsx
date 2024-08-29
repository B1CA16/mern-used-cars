import React from 'react'
import Navbar from './components/Navbar'
import Header from './components/Header'
import MostPopular from './components/MostPopular'
import Footer from './components/Footer'
import RecentlyAdded from './components/RecentlyAdded'

const App = () => {
  return (
    <div className=''>
      <Navbar />
      <Header />
      <MostPopular />
      <RecentlyAdded />
      <Footer />
    </div>
  )
}

export default App
