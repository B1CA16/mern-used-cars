import React from 'react'
import Header from '../components/Header'
import MostPopular from '../components/MostPopular'
import RecentlyAdded from '../components/RecentlyAdded'
import HomeBanner from '../components/HomeBanner'

const Home = () => {
  return (
    <div>
      <Header />
      <MostPopular />
      <HomeBanner />
      <RecentlyAdded />
    </div>
  )
}

export default Home
