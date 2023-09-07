// // React Imports
// import React from "react";

// // Style Imports
// import "../CSS/LandingPage.css";

// // Component Imports
// import Navbar from "../Components/Navbar";
// import WeatherDisplay from "../Components/HomePage/WeatherDisplay";
// import MainHomeContainer from "../Components/HomePage/MainContainer";
// import Footer from "../Components/Footer";

// // Page Component
// const LandingPage = () => {
//   return (
//     <div>
//       <Navbar />
//       <MainHomeContainer />
//       <WeatherDisplay />
//       <Footer/>
//     </div>
//   );
// };

// export default LandingPage;

// LandingPage.js

import React, { useState } from "react";
import "../CSS/LandingPage.css";

// Component Imports
import Navbar from "../Components/Navbar";
import WeatherDisplay from "../Components/HomePage/WeatherDisplay";
import MainHomeContainer from "../Components/HomePage/MainContainer";
import Footer from "../Components/Footer";

const LandingPage = () => {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navbar />
      <MainHomeContainer />
      <WeatherDisplay />
      <Footer />

      {showModal && (
        <div className="popup-modal">
          <div className="modal-content">
            <p>Still in development, some features may not work.</p>
            <button className="close-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
