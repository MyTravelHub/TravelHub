import React from "react";
import Navbar from "../Components/Navbar";
import AirportDelays from "../Components/AirportInfo/Delays";
import "../CSS/AirportInfo.css";

const AirlineInfo = () => {
    return (
        <>
            <Navbar />
            <div>
                <AirportDelays />
            </div>
        </>
    );
}

export default AirlineInfo;
