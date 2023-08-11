import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import AirportInfo from './Pages/AirportInfo';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
          <Route path="/AirportInfo" element={<AirportInfo />} />
        </Routes>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
