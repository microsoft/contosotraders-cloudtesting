import React from "react";

import Slider from "../../components/slider/slider";
import Banner from "../home/sections/banner";
import './arrivals.scss'
const Arrivals = (props) => {
    return (
        <div className="arrivals">
            <Banner firstHeading="Newly Launched Lunar Shift Controller" secondHeading="Textured triggers and bumpers | Hybrid D-pad | Button mapping | Bluetooth® technology"/>
            <Slider firstHeading="Newly Arrived" secondHeading="CONTROLLERS"/>
            <hr/>
            <Slider firstHeading="Newly Arrived" secondHeading="LAPTOPS"/>
            <hr/>
            <Slider firstHeading="Newly Arrived" secondHeading="GAMING ACCESSORIES"/>
            <hr/>
        </div>
    );
};

export default Arrivals;