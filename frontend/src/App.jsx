import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import CarsPage from "./pages/CarsPage";
import CarAdPAge from "./components/CarAdPAge";
import NotExist from "./pages/NotExist";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import StartSelling from "./components/StartSelling";
import Profile from "./components/Profile";
import MyAds from "./components/MyAds";
import Favorites from "./components/Favorites";
import NewAd from "./components/NewAd";
import PendingAds from "./components/PendingAds";

const App = () => {
    const location = useLocation();
    const noNavFooterPaths = ["/signin", "/signup"];
    const hideNavFooter = noNavFooterPaths.includes(location.pathname);

    return (
        <div>
            {!hideNavFooter && <Navbar />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotExist />} />
                <Route path="/cars" element={<CarsPage />} />
                <Route path="/car/:id" element={<CarAdPAge />} />
                <Route path="/start-selling" element={<StartSelling />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/my-ads" element={<MyAds />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/create-ad" element={<NewAd />} />
                <Route path="/pending-ads" element={<PendingAds />} />
            </Routes>

            {!hideNavFooter && <Footer />}
        </div>
    );
};

export default App;
