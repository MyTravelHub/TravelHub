import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import AirlineInfo from './Pages/AirlineInfo';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
          <Route path="/AirlineInfo" element={<AirlineInfo />} />
        </Routes>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
