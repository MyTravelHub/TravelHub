import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import AirportDelays from './Pages/AirportDelays';
import AirportMaps from './Pages/AiportMaps'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/AirportDelays" element={<AirportDelays />} />
          <Route path="/AirportDelays/:searchQuery" element={<AirportDelays />} />
          <Route path="Airports" element={<AirportMaps />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
