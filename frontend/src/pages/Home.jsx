import React from 'react'
import Header from '../components/Header'
import MostPopular from '../components/MostPopular'
import RecentlyAdded from '../components/RecentlyAdded'
import HomeBanner from '../components/HomeBanner'
import FrequentlyAskedQuestions from '../components/FrequentlyAskedQuestions'
import TipsAndMaintenance from '../components/TipsAndMaintenance '

const Home = () => {
  return (
    <div>
      <Header />
      <MostPopular />
      <HomeBanner />
      <RecentlyAdded />
      <FrequentlyAskedQuestions />
      <TipsAndMaintenance />
    </div>
  )
}

export default Home
