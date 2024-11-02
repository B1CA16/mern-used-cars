import React from "react";
import Header from "../components/Header";
import MostPopular from "../components/MostPopular";
import RecentlyAdded from "../components/RecentlyAdded";
import HomeBanner from "../components/HomeBanner";
import FrequentlyAskedQuestions from "../components/FrequentlyAskedQuestions";
import TipsAndMaintenance from "../components/TipsAndMaintenance";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="w-11/12 mx-auto">
        <MostPopular />
        <div className="mx-6 sm:mx-16">
          <HomeBanner
            image="/road.jpg"
            title="Ready to Drive Your Dream Car?"
            description="Explore the best deals on top-quality pre-owned cars. Drive away with confidence today."
            buttonText="Browse Inventory"
            buttonLink="/cars"
          />
        </div>
        <RecentlyAdded />
        <FrequentlyAskedQuestions />
        <TipsAndMaintenance />
      </div>
    </div>
  );
};

export default Home;
