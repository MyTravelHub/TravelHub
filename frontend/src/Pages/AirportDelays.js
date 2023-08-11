import React from "react";
import Navbar from "../Components/Navbar";
import Delays from "../Components/AirportInfo/Delays";
import "../CSS/AirportInfo.css";

const AirportDelays = () => {
    return (
        <>
            <Navbar />
            <div>
                <Delays />
            </div>
        </>
    );
}

export default AirportDelays;
