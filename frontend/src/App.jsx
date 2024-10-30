import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import CarsPage from './pages/CarsPage';
import CarAdPAge from './components/CarAdPAge';
import NotExist from './pages/NotExist';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import StartSelling from './components/StartSelling';

const App = () => {
  const location = useLocation();
  const noNavFooterPaths = ['/signin', '/signup'];
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
      </Routes>
      
      {!hideNavFooter && <Footer />}
    </div>
  );
};

export default App;
