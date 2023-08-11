import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import AirportDelays from './Pages/AirportDelays';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/AirportDelays" element={<AirportDelays />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
