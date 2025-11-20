import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Navigation from './components/Navigation';
import Home from './pages/Home';
import Home2 from './pages/Home2';
import About from './pages/About';
import Destinations from './pages/Destinations';
import Contact from './pages/Contact';
import Signup from './pages/Signup';

function AppRoutes() {
  const location = useLocation();
  const showNavigation = location.pathname !== '/signup';

  return (
    <>
      {showNavigation && <Navigation />}
      <div className={showNavigation ? 'pt-16' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/about" element={<About />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
